let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
let day = days[now.getDay()];
let li = document.querySelector("#date");

li.innerHTML = `${day} ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="75">
    <div class="weather-forecast-temperature>
    <span class="weather-forecast-temperature-max"> ${Math.round(
      forecastDay.temp.max
    )}° </span>
    <span class="weather-forecast-temperature-min"> ${Math.round(
      forecastDay.temp.min
    )}° </span>
    </div>
    </div>
    
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4a42817dae00951799107ef43a7ab2b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  console.log(response);
  let name = response.data.name;
  let descript = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windspeed = response.data.wind.speed;
  let messagename = `${name}`;
  let messagetemp = `${temp}`;
  let messagehum = `${humidity}`;
  let messagewind = `${windspeed}`;
  let messagedescript = `${descript}`;
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let humid = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherdescript = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  city.innerHTML = messagename;
  temperature.innerHTML = messagetemp;
  humid.innerHTML = messagehum;
  wind.innerHTML = messagewind;
  weatherdescript.innerHTML = messagedescript;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
  );

  getForecast(response.data.coord);
}

let apiKey = "4a42817dae00951799107ef43a7ab2b4";
let units = "imperial";
let city = "Oak Hill";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);

function showPosition(position) {
  let apiKey = "4a42817dae00951799107ef43a7ab2b4";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

function displayCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celciusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitTemperature = null;

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "4a42817dae00951799107ef43a7ab2b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
