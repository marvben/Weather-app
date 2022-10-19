const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, "../src/.env") });
const request = require("request");

const getWeather = (place, callbackFunc) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}=${place}`;
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callbackFunc("We could't connect to weather map app.", undefined);
    } else if (body.error) {
      console.log(body);
      callbackFunc("Place not found, please try another location!", undefined);
    } else {
      callbackFunc(undefined, body);
    }
  });
};

module.exports = getWeather;

////Using node axios internal module method 1

//const axios = require("axios");

// const weather = axios
//   .get("http://api.weatherstack.com/current", {
//     params: {
//       access_key: process.env.API_KEY,
//       query: "abuja",
//       units: "m",
//     },
//   })
//   .then(function (response) {
//     if (response.data.error) {
//       return response.data.error.info;
//     }
//     return response.data.current;
//   })
//   .catch(function (error) {
//     return "Unable to connect to weather service " + error.message;
//   });

// module.exports = weather;

////Using node axios internal module method 2, using asynchronous function
// app.get("/", async function (req, res) {
//   const response = await axios("http://api.weatherstack.com/current", {
//     params: {
//       access_key: process.env.API_KEY,
//       query: "lagos",
//     },
//   });

//   res.send(response.data);
// });

////Using node http internal module
//const http = require("http");

//const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=lagos`;
// app.get("/", function (req, res) {
//   const request = http.request(url, (response) => {
//     //console.log("statusCode:", response.statusCode);
//     //console.log("headers:", response.headers);

//  let data='';
//     response.on("data", (chunk) => {
//     data+=chunk.toString();
//       res.send(JSON.parse(data));
//     });
//   });

//   request.on("error", (e) => {
//     console.error(e);
//   });
//   request.end();
// });
