const apiKey = "7cbaf9080584e93d756d1e93ba5c46c8";

// Function to fetch weather data from API
const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
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

    // Update other UI elements with weather data
    document.querySelector(".city").innerText = 'Weather in ' + data.name;
    document.querySelector(".temp").innerText = data.main.temp + '°C';
    document.querySelector(".description").innerText = data.weather[0].description;
    document.querySelector(".humidity").innerText = 'Humidity: ' + data.main.humidity + '%';
    document.querySelector(".wind").innerText = 'Wind: ' + data.wind.speed + ' km/h';
    
    // Remove loading class to show weather details
    document.querySelector(".weather").classList.remove('loading');
};

// Function to update background image based on weather condition
const updateBackground = (weatherCondition) => {
    const body = document.querySelector("body");
    let backgroundImageUrl = "";

    switch (weatherCondition) {
        case "Clear":
            backgroundImageUrl = "https://i.pinimg.com/564x/94/08/44/940844fe0640eb63fdec1b90a72207cf.jpg";
            break;
        case "Clouds":
            backgroundImageUrl = "https://i.pinimg.com/564x/21/79/b1/2179b105685adb54de930280100ee0c9.jpg";
            break;
        case "Rain":
            backgroundImageUrl = "https://i.pinimg.com/564x/6a/87/6d/6a876dff3367a87bd58d9fd872a04163.jpg";
            break;
        case "Snow":
            backgroundImageUrl = "https://i.pinimg.com/564x/09/1a/03/091a03fcdb5b1dadf32436bf3079b662.jpg";
            break;
        case "Thunderstorm":
            backgroundImageUrl = "https://i.pinimg.com/564x/e2/e0/bd/e2e0bd405cdd73678727cf6b7c89d349.jpg";
            break;
        case "Mist":
        case "Fog":
            backgroundImageUrl = "https://i.pinimg.com/564x/62/77/70/6277707e8a7ff37fd5e6a0d4266e26e8.jpg";
            break;
        case "Wind":
            backgroundImageUrl = "https://i.pinimg.com/564x/f1/aa/0b/f1aa0b98bf38ef0e5ea4699cdb50105b.jpg";
            break;
        default:
            backgroundImageUrl = ""; // Default to no background image
    }

    body.style.backgroundImage = `url("${backgroundImageUrl}")`;
};

// Function to handle search button click event
document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.querySelector(".search-bar").value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Function to handle enter key press event in search input
document.querySelector(".search-bar").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = document.querySelector(".search-bar").value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert("Please enter a city name.");
        }
    }
});

// Fetch weather data for default city (Brooklyn, NY) on page load
fetchWeatherData("Brooklyn, NY");
