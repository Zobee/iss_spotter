const printPassTimes = function(passTimes) {
  for (const time of passTimes) {
    let datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime);
    let duration = time.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

module.exports = { printPassTimes };