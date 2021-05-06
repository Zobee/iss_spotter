const request = require('request-promise-native');

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json")
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
}

const fetchISSFlyOverTimes = (body) => {
  const {latitude, longitude} = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)  
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP) //equivalent to .then(data => fetchCoordsByIP(data))
  .then(fetchISSFlyOverTimes)
  .then(data => {
    return JSON.parse(data).response;
  })
}

module.exports = {nextISSTimesForMyLocation}