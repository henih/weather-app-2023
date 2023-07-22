function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  let temperature = `${Math.round(
    response.data.temperature.current
  )}<span class="units">°C</span>`;
  document.querySelector("#temperature").innerHTML = `${temperature}`;

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  document
    .querySelector("#icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);

  let currentTimeElement = document.querySelector("#current-time");
  currentTimeElement.innerHTML = moment().format("dddd H:mm");

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.city);
}
function lookUpCity(city) {
  let apiKey = "oa503cb248d231a90f14935068e8t36f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  lookUpCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "oa503cb248d231a90f14935068e8t36f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCurrentCity(event) {
  event.preventDefault();
  let currentCity = navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", searchCurrentCity);

let currentTimeElement = document.querySelector("#current-time");
currentTimeElement.innerHTML = moment().format("dddd H:mm");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src=${forecastDay.condition.icon_url}
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "oa503cb248d231a90f14935068e8t36f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
