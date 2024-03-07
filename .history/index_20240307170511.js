// Constants
const openWeatherMapApiKey = "7cbaf9080584e93d756d1e93ba5c46c8";

// Function to fetch weather data
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

// Function to update UI
const updateUI = (data) => {
    updateBackground(data.weather[0].main);
    const selectors = {
        ".city": `Weather in ${data.name}`,
        ".temp": `${data.main.temp}°C`,
        ".description": data.weather[0].description,
        ".humidity": `Humidity: ${data.main.humidity}%`,
        ".wind": `Wind: ${data.wind.speed} km/h`
    };
    for (const selector in selectors) {
        document.querySelector(selector).innerText = selectors[selector];
    }
    document.querySelector(".weather").classList.remove('loading');
};

// Function to update background image
const updateBackground = (weatherCondition) => {
    const conditions = ["Rain", "Clear", "Clouds", "Snow", "Thunderstorm", "Fog", "Windy"];
    const defaultCondition = "weather";
    const backgroundImageUrl = conditions.includes(weatherCondition)
        ? `https://source.unsplash.com/1600x900/?${weatherCondition.toLowerCase()}`
        : `https://source.unsplash.com/1600x900/?${defaultCondition.toLowerCase()}`;
    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
};

// Event listeners
const searchBtn = document.querySelector(".search-btn");
const searchBar = document.querySelector(".search-bar");

const handleSearch = () => {
    const city = searchBar.value;
    fetchWeather(city)
        .then(updateUI)
        .catch(console.error);
};

searchBtn.addEventListener("click", handleSearch);

searchBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Initial weather fetch
fetchWeather("Brooklyn, NY")
    .then(updateUI)
    .catch(console.error);
