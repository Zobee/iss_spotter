const { nextISSTimesForMyLocation} = require('./iss');

nextISSTimesForMyLocation((err, res) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(res);
});