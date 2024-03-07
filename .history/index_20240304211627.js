const apiKey = "7cbaf9080584e93d756d1e93ba5c46c8";

let weather = {
    apiKey: apiKey,
    fetchWeather: async function(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`);
            const data = await response.json();
            this.displayWeather(data);
        } catch (error) {
            console.log("Error fetching weather data:", error);
            // You can handle this error by displaying a message to the user or retrying the request.
        }
    },
    displayWeather: function(data) {
        if (data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            document.querySelector(".city").innerText = 'Weather in ' + name;
            document.querySelector('.description').innerText = description;
            document.querySelector('.temp').innerText = temp + '°C';
            document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + "%";
            document.querySelector('.wind').innerText = 'Wind speed: ' + speed + "km/h";
            document.querySelector('.weather').classList.remove('loading');
        } else {
            console.error('Weather data structure is invalid:', data);
            // You can handle this error by displaying a message to the user or retrying the request.
        }
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector('.search-bar').addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        weather.search();
    }
});

weather.fetchWeather("Denver"); // Default city to load weather information
