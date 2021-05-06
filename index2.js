const { nextISSTimesForMyLocation } = require("./iss_promised")
const { printPassTimes } = require('./printPassTimes')


nextISSTimesForMyLocation()
.then(data => printPassTimes(data))
.catch(err => console.log("Oops. There was an error.", err.message))