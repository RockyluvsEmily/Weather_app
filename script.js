const apiKey = '"dd1a697c95fa21cfa3ef106ba03c3c50"';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const searchHistoryDiv = document.getElementById('search-history');
let searchHistory = [];

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city === '') {
        return;
    }

    getWeatherData(city);
    cityInput.value = '';
});

searchHistoryDiv.addEventListener('click', function (event) {
    if (event.target.matches('button')) {
        const city = event.target.getAttribute('data-city');
        getWeatherData(city);
    }
});

function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

}

function displayCurrentWeather(data) {
    const currentWeather = data.list[0];
    const cityName = data.city.name;
    const date = new Date(currentWeather.dt * 1000).toLocaleDateString();
    const weatherIcon = currentWeather.weather[0].icon;
    const temperature = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;

    const currentWeatherHTML = `
        <h2>${cityName}</h2>
        <p>Date: ${date}</p>
        <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} K</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;

    currentWeatherDiv.innerHTML = currentWeatherHTML;
}

function displayForecast(data) {
    const forecast = data.list.slice(1, 6);

    let forecastHTML = '<h3>5-Day Forecast:</h3>';

    forecast.forEach(function (weather) {
        const date = new Date(weather.dt * 1000).toLocaleDateString();
        const weatherIcon = weather.weather[0].icon;
        const temperature = weather.main.temp;
        const humidity = weather.main.humidity;
        const windSpeed = weather.wind.speed;

        forecastHTML += `
          <div>
            <p>Date: ${date}</p>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
            <p>Temperature: ${temperature} K</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
          </div>
        `;
    });

    forecastDiv.innerHTML = forecastHTML;
}

function addToSearchHistory(city) {
    searchHistory.push(city);
    const button = document.createElement('button');
    button.textContent = city;
    button.setAttribute('data-city', city);
    searchHistoryDiv.appendChild(button);
}