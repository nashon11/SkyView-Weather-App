const openWeatherMapApiKey = "YOUR_API_KEY";
const fetchWeather = async (city) => {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}&units=metric`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch weather data");
    }
};
const updateUI = (data) => {
    updateBackground(data.weather[0].main);
    document.querySelector(".city").innerText = `Weather in ${data.name}`;
    document.querySelector(".temp").innerText = `${data.main.temp}°C`;
    document.querySelector(".description").innerText = data.weather[0].description;
    document.querySelector(".humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".wind").innerText = `Wind: ${data.wind.speed} km/h`;
    document.querySelector(".weather").classList.remove('loading');
};
const updateBackground = (weatherCondition) => {
    const body = document.querySelector("body");
    let backgroundImageUrl = "";

    switch (weatherCondition) {
        case "Rain":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?rain";
            break;
        case "Clear":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?clear";
            break;
        case "Clouds":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?cloudy";
            break;
        case "Snow":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?snow";
            break;
        case "Thunderstorm":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?thunderstorm";
            break;
        case "Fog":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?fog";
            break;
        case "Windy":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?windy";
            break;
        default:
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?weather";
            break;
    }

    body.style.backgroundImage = `url(${backgroundImageUrl})`;
};

document.querySelector(".search-btn").addEventListener("click", () => {
    const city = document.querySelector(".search-bar").value;
    fetchWeather(city).then((data) => {
        updateUI(data);
    }).catch((error) => {
        console.error(error);
    });
});

document.querySelector(".search-bar").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = document.querySelector(".search-bar").value;
        fetchWeather(city).then((data) => {
            updateUI(data);
        }).catch((error) => {
            console.error(error);
        });
    }
});