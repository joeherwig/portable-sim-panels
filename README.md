<img src="https://i.makeagif.com/media/11-01-2017/j8000c.gif" alt="animated gif of simulator side by side with portable-sim-panels" width="640px">

This is just a simple web client based on svg gauges for (flight) simulations etc. wich are updated via web-socket connections.
It's biggest advantage is, that the UI can be run on any device which is capable to display modern web pages. So you can use your rasperry pi, Panel-PC, Smartphone, old linux computer within your home cockpit as well. :-)

Depending on your specific panel CSS it might look for instance on your iPad like this:

<img src="https://joachim.herwigs.info/img/iPad_example_Duke.png" alt="portable-sim-panels on iPad" width="100%">

In the meanwhile i stripped the Backend and the UI into two seperate Projects.
this one is only the web UI stuff (webgauges and some minor stuff) and the FSUIPC-Connection server with Webserver which can host the files from this repo as well:

# [portable-sim-panels-fsuipc-server](https://gitlab.com/joeherwig/portable-sim-panels-fsuipc-server)
checkout this additional repo regarding the connection to your simulator as well. It doesn't come with any Gauges, but offers a simple way to connect using FSUIPC and to subscribe to a websocket channel where the FSUIPC values are published.

If you want to check out this gauges with your sim, just [download the zip](https://github.com/joeherwig/portable-sim-panels/archive/master.zip), extract it into the Folder `C:\webGauges` and get the corresponding [portable-sim-panels-fsuipc-server](https://gitlab.com/joeherwig/portable-sim-panels-fsuipc-server). Execute the Server and follow the steps described there.

# Try it without sim:
if you want to try it, without having a connection to a flight simulator you can run the below command in the browsers console to set the values of some gauges.
But you need to ensure, that the html is not opened from file-system as local file, but opend from a webserver  - eg. above mentioned portable-sim-panels-fsuipc-server which can host your website even without a simulator.

```
var event = new CustomEvent("update", { "detail": {
  "_TITLE":"Duke",
  "ATC_IDENTIFYER":"DIJOE",
  "AUTOPILOT_MASTER":1,
  "AUTOPILOT_ALTITUDE_LOCK":1, 
  "autopilot_heading_lock":1,
  "PLANE_HEADING_DEGREES_MAGNETIC":253.12,
  "AUTOPILOT_ALTITUDE_LOCK":1,
  "PLANE_BANK_DEGREES":-30,
  "PLANE_PITCH_DEGREES":1.6,
  "GPS_GROUND_SPEED":142,
  "TURN_COORDINATOR_BALL":-8,
  "NAV_1_CDI": -72,
  "NAV_1_GSI": 24,
  "DME_Switch":1,
  "NAV_2_DME_TIMETO": 278,
  "INDICATED_ALTITUDE":12387,
  "AUTOPILOT_ALTITUDE_LOCK_VAR":1240,
  "VERTICAL_SPEED":-732
}});
document.dispatchEvent(event);
```
<img src="https://joeherwig.github.io/EDST-Flightsim-Scenery_Hahnweide-Kirchheim-unter-Teck/images/JOE-Simtech-Logo.svg" width="100px">

This Application is available as FOSS (Free and open source Software) under The the following license:
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>
