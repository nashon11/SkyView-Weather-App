const openWeatherMapApiKey = "7cbaf9080584e93d756d1e93ba5c46c8";

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
    if (!data || !data.weather || data.weather.length === 0) {
        throw new Error("Invalid weather data");
    }

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
            backgroundImageUrl = "https://unsplash.com/photos/rain-dropping-from-roof-rNBaaxyeWWM";
            break;
        case "Clear":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?clear";
            break;
        case "Clouds":
            backgroundImageUrl = "https://source.unsplash.com/1600x900/?cloudy";
            break;
        case "Snow":
            backgroundImageUrl = "https://unsplash.com/photos/a-mountain-covered-in-snow-with-trees-in-the-background-oFh5I8duoBA";
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

const searchBtn = document.getElementById("search-btn");
const searchBar = document.querySelector(".search-bar");

searchBtn.addEventListener("click", async () => {
    const city = searchBar.value.trim();
    if (city) {
        try {
            const data = await fetchWeather(city);
            updateUI(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("City not found. Please try again.");
        }
    } else {
        alert("Please enter a city name.");
    }
});

searchBar.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        const city = searchBar.value.trim();
        if (city) {
            try {
                const data = await fetchWeather(city);
                updateUI(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                alert("City not found. Please try again.");
            }
        } else {
            alert("Please enter a city name.");
        }
    }
});

// Initial weather fetch
fetchWeather("Brooklyn, NY")
    .then(data => updateUI(data))
    .catch(error => {
        console.error("Error fetching initial weather data:", error);
        alert("Failed to fetch initial weather data. Please try again later.");
    });
