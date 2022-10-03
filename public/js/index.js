document.querySelector("h1").style.fontSize = "3rem";
const dataContainer = document.querySelector(".weatherDataContainer");
let isDay = document.querySelector(".isDayResult").value;
const resultMessage = document.querySelector(".resultMessage");

if (isDay === "yes") {
  document.body.style.backgroundColor = "#fff";
  document.body.style.color = "#000";
} else {
  document.body.style.backgroundColor = "#000";
  document.body.style.color = "#fff";
}

document.querySelector(".getPlace").addEventListener("input", debounce(fetchWeather, 1000));

function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

function fetchWeather(event) {
  const placeName = event.target.value;
  console.log(placeName);
  resultMessage.innerText = "Loading...";
  removeData();

  if (placeName.trim().length > 3) {
    fetch(`/weatherData?address=${placeName}`).then((res) => {
      res.json().then((data) => {
        if (!data.error) {
          resultTemplate(data);
          resultMessage.innerText = "";
        } else {
          resultMessage.innerText = data.error;
        }
      });
    });
  } else {
    resultMessage.innerText = "Please enter more than 3 characters";
  }
}

function resultTemplate({ current, location } = {}) {
  const root = document.createElement("div");
  root.innerHTML = `
    <p>${location.name}, ${location.country}</p>
    <p> Current temperature is: ${current.temperature} °C</p>
    <p>Feels like: ${current.feelslike} °C</p>
    <p>Forecast: ${current.weather_descriptions}</p>
    <p>${current.is_day === "yes" ? "Day" : "Night"} Time</p>
    <img src="${current.weather_icons}">`;

  isDay = current.is_day;
  dataContainer.appendChild(root);
}

function removeData() {
  dataContainer.innerHTML = "";
}
