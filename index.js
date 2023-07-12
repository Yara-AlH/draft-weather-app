let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function showTemperature(response) {
  let temp = document.querySelector("#temperature");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let weatherDescription = document.querySelector(".weatherDescription");

  temp.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function handleClick(event) {
  event.preventDefault();

  let cityInput = document.querySelector(".enter-city");
  let cityValue = cityInput.value;
  cityInput.value = null;

  let h1 = document.querySelector("#city");
  h1.innerHTML = cityValue;

  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`;
  console.log(apiURL);

  axios.get(apiURL).then(showTemperature);
}

let enterCity = document.querySelector(".searchCity");
enterCity.addEventListener("click", handleClick);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let h1 = document.querySelector("h1");
  h1.innerHTML = null;

  let apiKey = "d1a86552de255334f6117b348c4519bd";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentCity = document.querySelector(".currentCity");
currentCity.addEventListener("click", getCurrentLocation);
