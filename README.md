# GpxFromImages

Produces GPX from geo-tagged images.

## Install

```bash
git clone https://github.com/JanisE/gpx-from-images.git
cd gpx-from-images
npm install --production
```

Now, it's installed in that particular folder. No instructions on how to do it globally.

### Development notes

Run ```npm install``` instead to include all additional dependencies used for testing and building.

```grunt``` runs Grunt tasks (JSHint code correctness tests).

```gulp``` runs Gulp tasks (generates some docs).

### Prerequisites

As you can see, to install, you need to run commands `git` and `npm`. To use: `node` (or `nodejs`). These have to be installed first if not already available. Node.js must be at least version 5 (```node --version```). I'm testing with version 6.10 though, so maybe even 5 won't work.

For Windows users,
* for `git`, go to https://git-scm.com/, "Downloads for Windows" and install;
* for `node` and `npm`, go to https://nodejs.org/, download and install (includes `npm`).

## Usage

You can get the usage help from the program by running `node main`.

Note: NodeJS is available as `nodejs` in some distributions, as `node` in others.

Usage examples:

```bash
[23:56:56] janis@janis-desktop ~/Projekti/gps/GpxFromImages $ node main --source ./test/ImageFolder/
moment("2017-06-19T00:01:03.620") 'Starting...'
moment("2017-06-19T00:01:03.624") 'Files collected.'
moment("2017-06-19T00:01:04.253") 'Image #4 was just processed.'
moment("2017-06-19T00:01:04.254") 'Images processed.'
moment("2017-06-19T00:01:04.276") 'GPX built.'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gpx version="1.1" creator="GpxFromImages" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.topografix.com/GPX/Private/TopoGrafix/0/1 http://www.topografix.com/GPX/Private/TopoGrafix/0/1/topografix.xsd">
  <trk>
    <name>GPX from images</name>
    <trkseg>
      <trkpt lat="57.086664722" lon="24.125181389">
        <time>2017-06-16T16:40:57.000Z</time>
      </trkpt>
      <trkpt lat="57.086791389" lon="24.125384722">
        <time>2017-06-16T16:41:03.000Z</time>
      </trkpt>
      <trkpt lat="57.086880000" lon="24.125549722">
        <time>2017-06-16T16:41:09.000Z</time>
      </trkpt>
      <trkpt lat="57.086966389" lon="24.125808056">
        <time>2017-06-16T16:41:17.000Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>
[00:01:04] janis@janis-desktop ~/Projekti/gps/GpxFromImages $ 

[23:05:23] janis@janis-desktop ~/Projekti/gps/GpxFromImages $ node main --source /home/janis/Darbvirsma/Carnikava/100MSDCF/ --output ./test.gpx
moment("2017-06-17T23:06:02.882") 'Starting...'
moment("2017-06-17T23:06:02.897") 'Files collected.'
moment("2017-06-17T23:06:08.303") 'Image #94 was just processed.'
moment("2017-06-17T23:06:21.453") 'Image #294 was just processed.'
moment("2017-06-17T23:06:35.207") 'Image #494 was just processed.'
moment("2017-06-17T23:06:49.526") 'Image #694 was just processed.'
moment("2017-06-17T23:07:03.542") 'Image #894 was just processed.'
moment("2017-06-17T23:07:17.603") 'Image #1094 was just processed.'
moment("2017-06-17T23:07:31.658") 'Image #1294 was just processed.'
moment("2017-06-17T23:07:45.649") 'Image #1494 was just processed.'
moment("2017-06-17T23:07:59.457") 'Image #1694 was just processed.'
moment("2017-06-17T23:08:13.461") 'Image #1894 was just processed.'
moment("2017-06-17T23:08:27.073") 'Image #2094 was just processed.'
moment("2017-06-17T23:08:40.754") 'Image #2294 was just processed.'
moment("2017-06-17T23:08:40.762") 'Images processed.'
moment("2017-06-17T23:08:40.790") 'GPX built.'
[23:08:40] janis@janis-desktop ~/Projekti/gps/GpxFromImages $ 
```