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
  city.innerHTML = messagename;
  temperature.innerHTML = messagetemp;
  humid.innerHTML = messagehum;
  wind.innerHTML = messagewind;
  weatherdescript.innerHTML = messagedescript;
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