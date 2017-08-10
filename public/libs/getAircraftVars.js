const fs = require('fs')
,   cheerio = require('cheerio');

module.exports = async function (aircraft) {
  return new Promise(function (resolve, reject) {
    let currentAircraftVars = [];
    console.log('\n ----- ' + aircraft + ' --  panel file loading...');
    let panelfile = '.\\public\\panels\\' + aircraft + '\\index.html';
    fs.readFile( panelfile, function(err, data) {
      if (err) {
        console.log(err);
        resolve(['GENERAL ENG RPM:1','ENG MANIFOLD PRESSURE:1','ELEVATOR TRIM POSITION','TRAILING EDGE FLAPS LEFT ANGLE','TRAILING EDGE FLAPS RIGHT ANGLE','GEAR TOTAL PCT EXTENDED','VERTICAL SPEED','ENG FUEL FLOW PPH:1']);
      } else {
        const html = cheerio.load(data);
        html('object').each(function(i, elem) {
          if (elem.attribs.id !== 'Garmin-G5') { currentAircraftVars.push([elem.attribs.id])};
        });
        resolve(currentAircraftVars);
      }
    });
  })
}
