
const oProgram = require('commander');
const fProduceGpxFromImages = require('./lib/gpx_from_images').ProduceGpxFromImages;

oProgram
	.version('1.0.0')
	.option('--source <dirname>', 'The directory with geo-tagged photos.')
	.option('--output <filename>', 'The filename of the GPX output.')
	.parse(process.argv);

if (! process.argv.slice(2).length) {
	oProgram.outputHelp();
	process.exit(1);
}

try {
	fProduceGpxFromImages(oProgram.source, oProgram.output);
}
catch (oException) {
	oProgram.outputHelp();
	console.log(oException);
}
