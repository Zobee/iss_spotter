const { nextISSTimesForMyLocation} = require('./iss');
const { printPassTime, printPassTimes } = require('./printPassTimes')

nextISSTimesForMyLocation((err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  printPassTimes(res)
});