require("dotenv").config({ path: __dirname + "/./../.env", silent: process.env.NODE_ENV === "production" });
const router = require("express").Router();
const getWeather = require("../src/utils/weather.js");

//Used to get is_day result from api, passed to all get route, and used to change background color base on root page results
let getIsDayResult = "";

router.get("/", (req, res) => {
  const place = "Kiev";
  console.log(place);
  if (!place) {
    res.send("Please enter name of a place!");
  } else {
    getWeather(place, (error, { current, location } = {}) => {
      if (error) {
        res.send(error);
      } else {
        const { name, country, localtime, timezone_id } = location;
        const { temperature, feelslike, weather_descriptions, weather_icons, precip, humidity, is_day } = current;

        getIsDayResult = is_day;
        res.render("index", {
          pageTitle: "Home page",
          location,
          current,
          dayTime: is_day === "yes" ? "Day" : "Night",
          getIsDayResult: is_day,
        });
      }
    });
  }
});

//used to send data to client side(browser) fetch request
router.get("/weatherData", (req, res) => {
  const place = req.query.address;
  if (!place) {
    res.send({ Error: "Please enter search term" });
  } else {
    getWeather(place, (error, data) => {
      if (error) {
        res.send({ error });
      } else {
        res.send(data);
      }
    });
  }
});

router.get("/weather", (req, res) => {
  res.render("weather", { pageTitle: "Weather page", getIsDayResult });
});

router.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About me",
    name: "Benjamin Nwabunwanne",
    getIsDayResult,
  });
});

router.get("/help", (req, res) => {
  res.render("help", { pageTitle: "Help page", getIsDayResult });
});

//Example of specific 404 page request after e.g "/help/abcd", where abcd is not found
router.get("/help/*", (req, res, next) => {
  res.render("help_404", {
    pageTitle: "No article found",
    getIsDayResult,
  });
});

//for 404 page request
router.get("*", (req, res, next) => {
  res.render("404", { pageTitle: "Page 404", getIsDayResult });
});

module.exports = router;

// router.get("/", function (req, res) {
// getWeather("London", (error, data) => {
//   if (error) {
//     res.send({ Error: error });
//   } else {
//     res.send(data);
//   }
// });
// Promise.resolve(weather).then(function (response) {
//   res.send(response);
// });
// res.sendFile(path.join(__dirname, "../public/index.html"));
// });
