
const moment = require('moment');
const fGetImageCoordinates = require('geoexif').getImageCoordinates;
const fGetExifFieldsFromFile = require('geoexif').getExifFieldsFromFile;
const fReadDir = require('fs').readdirSync;
const fReadFile = require('fs').readFileSync;
const fAppendFile = require('fs').appendFileSync;
const fFileStat = require('fs').statSync;
const fParseXml = require('xml2js').parseString;
const oJsToXml = new (require('xml2js')).Builder();



function GetMomentFromExifGpsStamps (sExifDatestamp, sExifTimestamp)
{
	const aTimeParts = sExifTimestamp.match(RegExp('(\\d+)/(\\d+), ?(\\d+)/(\\d+), ?(\\d+)/(\\d+)'));

	if (! aTimeParts) {
		throw new Error('No valid GPS time: ', sExifDatestamp, sExifTimestamp);
	}

	return moment(
		sExifDatestamp + ' '
		+ Math.round(parseInt(aTimeParts[1]) / parseInt(aTimeParts[2])) + ':'
		+ Math.round(parseInt(aTimeParts[3]) / parseInt(aTimeParts[4])) + ':'
		+ Math.round(parseInt(aTimeParts[5]) / parseInt(aTimeParts[6])) + ' '
		+ 'Z',
		'YYYY:MM:DD H:m:s Z',
		true
	);
}

function ProduceGpxFromImages (sSourceDir, sOutputFile)
{
	console.log(moment(), 'Starting...');

	const aCoords = [];
	const aFiles = fReadDir(sSourceDir).filter(sFile => ! fFileStat(`${sSourceDir}/${sFile}`).isDirectory());

	console.log(moment(), 'Files collected.');

	function ProcessFiles (iStartWithFile)
	{
		const iCurrentFile = iStartWithFile;
		if (iCurrentFile < 0) {
			console.log('Nothing to process.');
			return;
		}

		// NOTE! Cannot call "fGetImageCoordinates" for many files all at once, as it cannot handle it
		// 	("checkBrewBinExists" starts failing, apparently trying to create too many child processes).
		// 	So, process the files one by one.
		fGetImageCoordinates(`${sSourceDir}/${aFiles[iCurrentFile]}`)
		.then(aImageCoords =>
		{
			// NB! "DateTimeOriginal" is the time of taking the photo. As we use GPS time fields instead
			//      (which denotes the time of the (closest?) GPS fix), the track point may not match what is
			//      seen in the photo exactly (in some cases – there may be a difference of several hours!).
			//      But generally, in noraml circumstances – it should match with <=1 s offset.
			
			fGetExifFieldsFromFile(['DateTimeOriginal', 'GPSTimeStamp', 'GPSDateStamp'], `${sSourceDir}/${aFiles[iCurrentFile]}`)
			.then(aImageTime =>
			{
				try {
					aCoords.push({
						aCoords: aImageCoords,
						oTime: GetMomentFromExifGpsStamps(aImageTime.GPSDateStamp, aImageTime.GPSTimeStamp)
					});
				}
				catch (oException) {
					console.log('Track point data could not be extracted from file ', aFiles[iCurrentFile], ': ', oException);
				}

				// Show some progress.
				if (iCurrentFile % 200 === 0) {
					console.log(moment(), 'Image #' + (aFiles.length - iCurrentFile) + ' was just processed.');
				}

				if (iCurrentFile <= 0) {
					aCoords.sort((oCoordA, oCoordB) =>
					{
						return oCoordB.oTime.isBefore(oCoordA.oTime) ? 1 : -1;
					});
					console.log(moment(), 'Images processed.');

					fParseXml(fReadFile('./resources/gpx.template.xml', {encoding: 'UTF-8'}),
					(oErr, oGpx) =>
					{
						const aTrackPoints = oGpx.gpx.trk[0].trkseg[0].trkpt = [];

						for (const oCoords of aCoords) {
							aTrackPoints.push({
								'$': {
									lat: oCoords.aCoords[0].toFixed(9),	// A bigger precision is ridiculous.
									lon: oCoords.aCoords[1].toFixed(9)
								},
								time: [oCoords.oTime.toISOString()]
							});
						}

						console.log(moment(), 'GPX built.');

						if (sOutputFile) {
							fAppendFile(sOutputFile, oJsToXml.buildObject(oGpx));
						}
						else {
							console.log(oJsToXml.buildObject(oGpx));
						}
					});
				}
				else {
					ProcessFiles(iCurrentFile - 1);
				}
			});
		});
	}

	ProcessFiles(aFiles.length - 1);
}



module.exports = {
	ProduceGpxFromImages: ProduceGpxFromImages
};
