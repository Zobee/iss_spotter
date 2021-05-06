const request = require('request');

const fetchMyIP = (callback) => {
  console.log("Fetching!");
  request("https://api.ipify.org?format=json", (err, res, body) => {
    if (err) return callback(err);
    
    
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg));
      return;
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {
    if (err) return callback(err);

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when trying to fetch ${ip}'s lat/long. Response: ${body}`;
      callback(Error(msg));
      return;
    }

    const {latitude, longitude} = JSON.parse(body);
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {
    if (err) return callback(err);

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching ISS passover information. Response: ${body}`;
      callback(Error(msg));
      return;
    }
    
    callback(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) return callback(err);
    
  
    //console.log('It worked! Returned IP:', ip);
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return callback(err);
  
      //console.log('Sucess! Returned Coords:', coords);
      fetchISSFlyOverTimes(coords, (err, passoverTimes) => {
        if (err) return callback(err);
  
        callback(null, passoverTimes);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };