const apiKey = "7cbaf9080584e93d756d1e93ba5c46c8";

const processWeatherData = (data) => {
    const weatherCondition = data.weather[0].main;

    switch (weatherCondition) {
        case "Clear":
            document.body.style.backgroundColor = "lightblue";
            break;
        case "Clouds":
            document.body.style.backgroundColor = "lightgray";
            break;
        case "Rain":
            document.body.style.backgroundColor = "lightblue";
            break;
        default:
            document.body.style.backgroundColor = "white";
            break;
    }

    const cityNameElement = document.querySelector(".city-name");
    const temperatureElement = document.querySelector(".temperature");
    const descriptionElement = document.querySelector(".description");
    const humidityElement = document.querySelector(".humidity");
    const windSpeedElement = document.querySelector(".wind-speed");

    cityNameElement.textContent = data.name;
    temperatureElement.textContent = `${data.main.temp}°C`;
    descriptionElement.textContent = data.weather[0].description;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind speed: ${data.wind.speed}km/h`;
};

const getWeatherData = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            processWeatherData(data);
        })
        .catch(error => {
            console.log("Error fetching weather data:", error);
        });
};

const searchButton = document.querySelector(".search button");
const searchBar = document.querySelector('.search-bar');

searchButton.addEventListener("click", () => {
    getWeatherData(searchBar.value);
});

searchBar.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        getWeatherData(searchBar.value);
    }
});

// Initial weather data for Kitengela
getWeatherData("Kitengela");
