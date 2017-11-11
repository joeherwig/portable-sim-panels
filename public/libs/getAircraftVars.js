const fs = require('fs')
,   availableVars = require('.\\..\\availableVars.json');


function findVarByVarName(findVar) {
  let foundVar
  availableVars.forEach(function(elem, i) {
    if(elem.name === findVar) {
      console.log(findVar + ' => ' + JSON.stringify(elem) );
      foundVar = [elem.name, elem.unitsname];
    }
  });
  return foundVar;
};

function getvars(panelConfigJson) {
  varList = Object.keys(JSON.parse(data.toString()));
  varList.forEach(function(elem, i) {
    let foundVar = findVarByVarName(elem);
    if (foundVar !== undefined) {
      currentAircraftVars.push(foundVar);
    } else {
      console.log(elem + ' not assignable. Please check availableVars.json if configured properly!');
    }
  });
};
module.exports = async function (aircraft) {
  return new Promise(function (resolve, reject) {
    let currentAircraftVars = [];
    let panelfile = '.\\public\\panels\\' + aircraft.aircraft + '\\config.json';
    fs.readFile( panelfile, function(err, panelConfigJson) {
      if (err) {
        engineNumbers = (aircraft["number of engines"]+'');
        engineType = (aircraft["engine type"]+'').replace('0','EP').replace('1','ET').replace('2','TMG').replace('3','H').replace('5','ET');
        heliTag = aircraft["engine type"] === 3 ? '(H)' : '';
        console.log('\n ----- ' + aircraft.aircraft + ' --  generic file loading... for '+ engineNumbers + engineType + heliTag);
        let defaultFile = '.\\public\\panels\\' + engineNumbers + engineType + heliTag +'\\config.json';
        fs.readFile(defaultFile, function(err, panelConfigJson) {
          if (err) {
            console.log("unable to load generic config for '"+engineNumbers + engineType + heliTag+"'.\nContinuing with fallback on standard-six.");
            // resolve(['GENERAL ENG RPM:1','ENG MANIFOLD PRESSURE:1','ELEVATOR TRIM POSITION','TRAILING EDGE FLAPS LEFT ANGLE','TRAILING EDGE FLAPS RIGHT ANGLE','GEAR TOTAL PCT EXTENDED','VERTICAL SPEED','ENG FUEL FLOW PPH:1']);
          } else {
            console.log("Generic config for '"+engineNumbers + engineType + heliTag+"' loaded!");
            varList = Object.keys(JSON.parse(panelConfigJson.toString()));
            varList.forEach(function(elem, i) {
              let foundVar = findVarByVarName(elem);
              if (foundVar !== undefined) {
                currentAircraftVars.push(foundVar);
              } else {
                console.log(elem + ' not assignable. Please check availableVars.json if configured properly!');
              }
            });
            console.log('\n\n\n\n-----------------------------'+JSON.stringify(currentAircraftVars));

            resolve(currentAircraftVars);
          }
        })
      } else {
        console.log('Aircraft specific config loaded for ' + aircraft.aircraft + '...');
        varList = Object.keys(JSON.parse(panelConfigJson.toString()));
        varList.forEach(function(elem, i) {
          let foundVar = findVarByVarName(elem);
          if (foundVar !== undefined) {
            currentAircraftVars.push(foundVar);
          }
        });
        console.log('\n\n\n\n-----------------------------'+JSON.stringify(currentAircraftVars));
        resolve(currentAircraftVars);
      }
    });
  })
}
