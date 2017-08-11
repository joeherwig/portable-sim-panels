# Introduction
This is just a simple web client based on svg gauges for (flight) simulations etc. wich are updated via socket connections.
Currently only supported for 32 Bit Simconnect (FSX and Prepar3D < v4)

## Build
### Requirements
* Node.js (32-bit version for compiling and running Simconnect32 bit.)
* node-gyp (globally installed) https://github.com/nodejs/node-gyp
* Visual Studio
* FSX or P3D SimConnect SDK files (.lib and .h).

NOTE: If your app needs to work with both FSX and P3D you must use the FSX SDK.

### Manual build
Due to the licensing of the Flight Simulator / Prepar3D SDK, those libraries are not included in this repository, so automatic build is not possible at the moment.
To build the native node module you must provide your own SDK files. For FSX:SE, these can be found under `FSX\SDK\Core Utilities Kit\SimConnect SDK`. Follow these steps carefully:

* Clone this repository
* Inside the new `node-simconnect` directory (or `node-modules/node-simconnect`), create a folder named `SimConnect` and copy the two folders `inc` and `lib` from the SimConnect SDK installation over to the new directory. These should include `SimConnect.h` and `SimConnect.lib`, respectively.
* From the `node-simconnect` directory, run `npm install`
* If everything went well you should be able to run the simple example program: by running `npm start`.

### Use
Start your Simulator and you will reach the example panel at [http://localhost:8080/panels/1EP/](http://localhost:8080/panels/1EP/)

### Pending
[ ]  Test with 64Bit Simconnect from Prepar3D V4.
