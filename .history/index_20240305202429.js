// Constants for API key and default city
const apiKey = "7cbaf9080584e93d756d1e93ba5c46c8";
const defaultCity = "Kitengela";

// Function to fetch weather data from API
const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        processWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Function to process weather data and update the UI
const processWeatherData = (data) => {
    // Update background image based on weather condition
    updateBackground(data.weather[0].main);
    
    // Other code to update the UI with weather data...
};

// Function to update background image based on weather condition
const updateBackground = (weatherCondition) => {
    const body = document.querySelector("body");
    const backgroundImage = getBackgroundImage(weatherCondition);
    body.style.backgroundImage = `url("${backgroundImage}")`;
};

// Function to get the background image path based on weather condition
const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
        case "Clear":
            return "clear.jpg";
        case "Clouds":
            return "cloudy.jpg";
        case "Rain":
            return "rainy.jpg";
        default:
            return "default.jpg"; // Default image
    }
};

// Call fetchWeatherData function with a default city
fetchWeatherData(defaultCity);