const fs = require('fs')
,   availableVars = require('.\\..\\desiredVars.json');

/*
function findVarByVarName(findVar) {
  if (findVar.name === this[0]) {
    return findVar;
  }
};
*/
module.exports = async function (aircraft) {
  return new Promise(function (resolve, reject) {
    let currentAircraftVars = [];
    console.log('\n ----- ' + aircraft.aircraft + ' --  panel file loading...');
    let panelfile = '.\\public\\panels\\' + aircraft.aircraft + '\\config.json';
    fs.readFile( panelfile, function(err, data) {
      if (err) {
        engineNumbers = (aircraft["number of engines"]+'');
        engineType = (aircraft["engine type"]+'').replace('0','EP').replace('1','ET').replace('2','TMG').replace('3','H').replace('5','ET');
        heliTag = aircraft["engine type"] === 3 ? '(H)' : '';
        let defaultFile = '.\\public\\panels\\' + engineNumbers + engineType + heliTag +'\\config.json';
        fs.readFile(defaultFile, function(err, data) {
          if (err) {
            console.log("unable to load generic config for '"+engineNumbers + engineType + heliTag+"'.\nContinuing with fallback on standard-six.");
            resolve(['GENERAL ENG RPM:1','ENG MANIFOLD PRESSURE:1','ELEVATOR TRIM POSITION','TRAILING EDGE FLAPS LEFT ANGLE','TRAILING EDGE FLAPS RIGHT ANGLE','GEAR TOTAL PCT EXTENDED','VERTICAL SPEED','ENG FUEL FLOW PPH:1']);
          } else {
            console.log("Generic config for '"+engineNumbers + engineType + heliTag+"' loaded!");
            varList = Object.keys(JSON.parse(data.toString()));
            varList.forEach(function(elem, i) {
              //currentAircraftVars.push([fullVar.name, fullVar.unitsname, fullVar.type, fullVar.epsilon]);
              currentAircraftVars.push([elem]);
            });
            console.log()
            resolve(currentAircraftVars);
          }
        })
      } else {
        console.log("Aircraft specific config loaded!");
        varList = Object.keys(JSON.parse(data.toString()));
        varList.forEach(function(elem, i) {
          currentAircraftVars.push([elem]);
        });
        resolve(currentAircraftVars);
      }
    });
  })
}
