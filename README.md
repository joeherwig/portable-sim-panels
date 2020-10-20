<img src="https://i.makeagif.com/media/11-01-2017/j8000c.gif" alt="animated gif of simulator side by side with portable-sim-panels" width="640px">

This is just a simple web client based on svg gauges for (flight) simulations etc. wich are updated via web-socket connections.
It's biggest advantage is, that the UI can be run on any device which is capable to display modern web pages. So you can use your rasperry pi, Panel-PC, Smartphone, old linux computer within your home cockpit as well. :-)

Btw: We're also FS2020 / MSFS and <img src="https://joesimtech.com/wp-content/uploads/2020/04/P3D_v5_Badge.svg" width="120"> V5 compatible!

Depending on your specific panel CSS it might look for instance on your iPad like this:

<img src="https://joachim.herwigs.info/img/example_Duke_iPad.png" alt="portable-sim-panels on iPad" width="100%">

# [Documentation](https://github.com/joeherwig/portable-sim-panels/wiki/)
The documentation for this repo and the [available gauges](https://github.com/joeherwig/portable-sim-panels/wiki/Gauges), are available within the wiki.

# [portable-sim-panels-fsuipc-server](https://gitlab.com/joeherwig/portable-sim-panels-fsuipc-server)
In the meanwhile i stripped the Backend and the UI into two seperate Projects.
this one is only the web UI stuff (webgauges and some minor stuff) and the FSUIPC-Connection server with Webserver which can host the files from this repo as well: checkout the additional repo [portable-sim-panels-fsuipc-server](https://gitlab.com/joeherwig/portable-sim-panels-fsuipc-server) regarding the connection to your simulator as well. It doesn't come with any Gauges, but offers a simple way to connect using FSUIPC and to subscribe to a websocket channel where the FSUIPC values are published.

If you want to check out this gauges with your sim, just [download the zip](https://github.com/joeherwig/portable-sim-panels/archive/master.zip), extract it into the Folder `C:\webGauges` and get the corresponding [portable-sim-panels-fsuipc-server](https://gitlab.com/joeherwig/portable-sim-panels-fsuipc-server). Execute the Server and follow the steps described there.

# Try it without sim:
If you want to try it, without having a connection to a flight simulator you can run the below command in the browsers console to set the values of some gauges.
But you need to ensure, that the html is not opened from file-system as local file, but opend from a webserver  - eg. above mentioned portable-sim-panels-fsuipc-server which can host your website even without a simulator.

```
var event = new CustomEvent("update", { "detail": {
  "TITLE":"320",
  "ATC_IDENTIFYER":"DAJOE",
  "AUTOPILOT_MASTER":1,
  "AUTOPILOT_ALTITUDE_LOCK":1, 
  "autopilot_heading_lock":1,
  "PLANE_HEADING_DEGREES_MAGNETIC":253.12,
  "AUTOPILOT_ALTITUDE_LOCK":1,
  "PLANE_BANK_DEGREES":-12,
  "PLANE_PITCH_DEGREES":3.6,
  "GPS_GROUND_SPEED":142,
  "TURN_COORDINATOR_BALL":-0,
  "NAV_1_CDI": -72,
  "NAV_1_GSI": 24,
  "DME_Switch":1,
  "NAV_2_DME_TIMETO": 278,
  "INDICATED_ALTITUDE":4158,
  "AUTOPILOT_ALTITUDE_LOCK_VAR":4100,
  "VERTICAL_SPEED":-732,
  "GEAR_LEFT_POSITION":0,
  "GEAR_CENTER_POSITION":100,
  "GEAR_right_POSITION":50,
  "ELEVATOR_TRIM_POSITION":8,
  "TRAILING_EDGE_FLAPS_LEFT_PERCENT":15,
  "TRAILING_EDGE_FLAPS_RIGHT_PERCENT":15,
}});
document.dispatchEvent(event);
```
<a href="https://joesimtech.com"><img src="https://joeherwig.github.io/EDST-Flightsim-Scenery_Hahnweide-Kirchheim-unter-Teck/images/JOE-Simtech-Logo.svg" width="50px"></a>

This application is available as FOSS (Free and open source Software) under the the <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons 'by-nc-sa 4.0'-license.</a>

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>
