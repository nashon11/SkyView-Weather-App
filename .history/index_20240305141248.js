let weather = {
    apiKey: "7cbaf9080584e93d756d1e93ba5c46c8",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&appid=" + this.apiKey + "&units=metric")
            .then((response) => response.json())
            .then((data) => {
                this.displayWeather(data);
                this.changeBackground(data.weather[0].main);
            });
    },

    displayWeather: function(data) {
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

    changeBackground: function(weatherCondition) {
        const body = document.querySelector('body');
        switch (weatherCondition) {
            case "Clear":
                body.style.backgroundImage = "url('clear-sky.jpg')";
                break;
            case "Clouds":
                body.style.backgroundImage = "url('cloudy-sky.jpg')";
                break;
            case "Rain":
                body.style.backgroundImage = "url('rainy-sky.jpg')";
                break;
            default:
                body.style.backgroundImage = "url('default-sky.jpg')";
                break;
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

weather.fetchWeather("Denver");
