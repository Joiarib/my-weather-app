let now = new Date();

let h2 = document.querySelector("h2");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(day);
let hours = now.getHours();
hours = hours % 12 || 12;
console.log(hours);
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
console.log(minutes);
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let ampm = hours >= 12 ? "am" : "pm";
let year = now.getFullYear();
h2.innerHTML = ` ${day}, ${hours}:${minutes} ${ampm}`;
let date = now.getDate();
let today = document.querySelector("#today-is");
today.innerHTML = `Today is, ${month} ${date}, ${year}`;

function showWeather(response) {
  document.querySelector("#header-one").innerHTML = response.data.name;
  document.querySelector("#holder").innerHTML =
    "It is " + Math.round(response.data.main.temp) + "°F";
}
function search(event) {
  event.preventDefault();
  let apiKey = "cf1ef184bc4f8c6749a14597b0b5efe6";
  let city = document.querySelector("#city-input").value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-engine");
form.addEventListener("submit", search);

function showCurrentWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innetHTML = response.data.name;
  let currentWeather = document.querySelector("#current-temp");
  let currentTemperature = Math.round(response.data.main.temp);
  currentWeather.innerHTML = `It is ${currentTemperature}`;
}
function showPosition(position) {
  let apiKey = "cf1ef184bc4f8c6749a14597b0b5efe6";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentTemp = document.querySelector("button");
currentTemp.addEventListener("click", getCurrentPosition);
