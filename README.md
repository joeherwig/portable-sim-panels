<img src="https://i.makeagif.com/media/11-01-2017/j8000c.gif" alt="alt text" width="75%">

This is just a simple web client based on svg gauges for (flight) simulations etc. wich are updated via web-socket connections.
It's biggest advantage is, that the UI can be run on any device which is capable to display modern web pages. So you can use your rasperry pi, Panel-PC, Smartphone, old linux computer within your home cockpit as well. :-)

It Works with 32 Bit and 64 Bit simconnect and though with FSX and all Prepar3D versions including <img src="http://joachim.herwigs.info/img/P3Dv4-tag.png" height="24px">


## Build
### Requirements
* Node.js (32-bit version for compiling and running Simconnect32 bit or 64-bit version for running Prepar3d V4 Simconnec64)
* WebSimConnect (WebSimData) by Marcin Lizer

### Config
Underneath the `public/panels/` folder there are several panels available for your needs.
See also the installation/config instructions from WebSimConnect / WebSimData
The portable-sim-panels tool is supplied with the configured variables you defined within your simulators gauge-Folder assigned to the aircraft of your desire.
If you didn't define a vehicle specific panel, it tries to load a suitable fallback-panel eg. for "single engine piston" or "multi engine turbine" etc.
See the WebSimData_1EP.ini underneath public/panels/1EP for an example how to configure, which variables are fetched. This file needs to be placed in your `"$Env:Programfiles\Lockheed Martin\Prepar3D v4\gauges\WebSimData\"` - folder and needs to be referenced from your vehicles panel.cfg as documented in Marcins Documentation.

### Use
Start your Simulator and you will reach the example panel at [http://localhost:8080/panels/1EP/](http://localhost:8080/panels/1EP/)

<img src="https://joeherwig.github.io/EDST-Flightsim-Scenery_Hahnweide-Kirchheim-unter-Teck/images/JOE-Simtech-Logo.svg" width="100px">

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>
