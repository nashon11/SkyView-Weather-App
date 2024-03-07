// Function to fetch weather data for a given location
const fetchWeatherData = async (query) => {
    const apiKey = "YOUR_API_KEY"; // Replace "YOUR_API_KEY" with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found.");
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert("City not found. Please try again.");
    }
};

// Function to update the UI with weather data
const updateUI = (data) => {
    updateBackground(data.weather[0].icon);
    // Update other UI elements with weather data
    document.querySelector(".city").innerText = `Weather in ${data.name}`;
    document.querySelector(".temp").innerText = `${data.main.temp}°C`;
    document.querySelector(".description").innerText = data.weather[0].description;
    document.querySelector(".humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.querySelector(".wind").innerText = `Wind: ${data.wind.speed} km/h`;
    // Remove loading class to show weather details
    document.querySelector(".weather").classList.remove('loading');
};

// Function to update background image based on weather condition
const updateBackground = (weatherCondition) => {
    const body = document.querySelector("body");
    let backgroundImageUrl = "";

    switch (weatherCondition) {
        case "01d": // Clear sky (day)
            backgroundImageUrl = "https://openweathermap.org/img/wn/01d@2x.png";
            break;
        case "01n": // Clear sky (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/01n@2x.png";
            break;
        case "02d": // Few clouds (day)
        case "02n": // Few clouds (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/02d@2x.png";
            break;
        case "03d": // Scattered clouds (day)
        case "03n": // Scattered clouds (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/03d@2x.png";
            break;
        case "04d": // Broken clouds (day)
        case "04n": // Broken clouds (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/04d@2x.png";
            break;
        case "09d": // Shower rain (day)
        case "09n": // Shower rain (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/09d@2x.png";
            break;
        case "10d": // Rain (day)
        case "10n": // Rain (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/10d@2x.png";
            break;
        case "11d": // Thunderstorm (day)
        case "11n": // Thunderstorm (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/11d@2x.png";
            break;
        case "13d": // Snow (day)
        case "13n": // Snow (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/13d@2x.png";
            break;
        case "50d": // Mist (day)
        case "50n": // Mist (night)
            backgroundImageUrl = "https://openweathermap.org/img/wn/50d@2x.png";
            break;
        default:
            backgroundImageUrl = ""; // Default to no background image
    }

    body.style.backgroundImage = `url("${backgroundImageUrl}")`;
};

// Function to handle search button click event
document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.querySelector(".search-bar").value.trim();
    if (query) {
        fetchWeatherData(query);
    } else {
        alert("Please enter a location.");
    }
});

// Function to handle enter key press event in search input
document.querySelector(".search-bar").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const query = document.querySelector(".search-bar").value.trim();
        if (query) {
            fetchWeatherData(query);
        } else {
            alert("Please enter a location.");
        }
    }
});

// Fetch weather data for default location (New York, NY) on page load
fetchWeatherData("New York,NY");
