<img src="https://i.makeagif.com/media/11-01-2017/j8000c.gif" alt="alt text" width="75%">

This is just a simple web client based on svg gauges for (flight) simulations etc. wich are updated via web-socket connections.
It's biggest advantage is, that the UI can be run on any device which is capable to display modern web pages. So you can use your rasperry pi, Panel-PC, Smartphone, old linux computer within your home cockpit as well. :-)

In the meanwhile i stripped the Backend and the UI into two seperate Projects.
this one is only the web UI stuff (webgauges and some minor stuff) and the FSUIPC-Connection server with Webserver which can host the files from this repo as well:

# [portable-sim-panels-fsuipc-server](https://gitlab.com/joeherwig/portable-sim-panels-fsuipc-server)
checkout this additional repo regarding the connection to your simulator as well. It doesn't come with any Gauges, but offers a simple way to connect using FSUIPC and to subscribe to a websocket channel where the FSUIPC values are published.

If you want to check out this gauges with your sim, just [download the zip](https://github.com/joeherwig/portable-sim-panels/archive/master.zip), extract it into the Folder `C:\webGauges` and get the corresponding [portable-sim-panels-fsuipc-server](https://gitlab.com/joeherwig/portable-sim-panels-fsuipc-server). Execute the Server and follow the steps described there.

<img src="https://joeherwig.github.io/EDST-Flightsim-Scenery_Hahnweide-Kirchheim-unter-Teck/images/JOE-Simtech-Logo.svg" width="100px">

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons Lizenzvertrag" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>
