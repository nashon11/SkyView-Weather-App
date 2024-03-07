const apiKey = "YOUR_API_KEY";

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
    switch (weatherCondition) {
        case "Clear":
            body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case "Clouds":
            body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case "Rain":
            body.style.backgroundImage = 'url("rainy.jpg")';
            break;
        default:
            body.style.backgroundImage = 'url("default.jpg")'; // Default image
            break;
    }
};

// Call fetchWeatherData function with a default city
fetchWeatherData("Kitengela");
