// Define variables and functions for autocomplete, forecast, geolocation, unit conversion, and error handling

let weather = {
    apiKey: "7cbaf9080584e93d756d1e93ba5c46c8",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&appid=" + this.apiKey + "&units=metric")
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = 'Weather in ' + name;
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + "%";
        document.querySelector('.wind').innerText = 'Wind speed: ' + speed + "km/h";
        document.querySelector(".weather").classList.remove('loading');
    },

    fetchForecast: function (city) {
        // Fetch forecast data for multiple days and display them in the forecast section
        // Make sure to handle the response and update the forecast section accordingly
    },

    toggleUnit: function () {
        // Toggle between Celsius and Fahrenheit units for temperature display
        // Update the temperature values accordingly
    },

    getLocation: function () {
        // Get the user's geolocation using the browser's Geolocation API
        // Fetch weather data for the user's location and display it
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector('.search-bar').addEventListener("input", function () {
    // Implement autocomplete functionality here
    // Fetch city suggestions based on user input and display them in the autocomplete dropdown
});

document.querySelector('#geolocation-btn').addEventListener("click", function () {
    weather.getLocation();
});

document.querySelector('#unit-toggle-btn').addEventListener("click", function () {
    weather.toggleUnit();
});

weather.fetchWeather("Denver"); // Initial weather data fetch
