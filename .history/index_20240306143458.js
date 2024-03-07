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
            backgroundImageUrl = "https://i.pinimg.com/564x/50/05/40/50054039958fd5ee15565c61aac2bf25.jpg";
            break;
        case "Rain":
            backgroundImageUrl = "https://i.pinimg.com/564x/6a/87/6d/6a876dff3367a87bd58d9fd872a04163.jpg";
            break;
        case "Snow":
            backgroundImageUrl = "https://i.pinimg.com/564x/93/2f/69/932f69e42bb5a51e4f54b3358b2289c6.jpg";
            break;
        case "Thunderstorm":
            backgroundImageUrl = "https://i.pinimg.com/564x/72/fa/ee/72faeecbab43f1117cad8850dcd33b28.jpg";
            break;
        case "Mist":
        case "Fog":
            backgroundImageUrl = "https://i.pinimg.com/564x/e4/11/98/e411980083f465485026e6c3ea79a5aa.jpg";
            break;
        case "Wind":
            backgroundImageUrl = "https://i.pinimg.com/564x/2e/bb/6e/2ebb6ec6d147f6f0647ed83f03c291f4.jpg";
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
        } else {const weather = {
    apiKey: "7cbaf9080584e93d756d1e93ba5c46c8",
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = 'Weather in ' + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + "%";
        document.querySelector('.wind').innerText = 'Wind: ' + speed + "m/s";
        document.querySelector(".weather").classList.remove('loading');
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

weather.fetchWeather("Brooklyn, NY");

            alert("Please enter a city name.");
        }
    }
});

// Fetch weather data for default city (Brooklyn, NY) on page load
fetchWeatherData("Brooklyn, NY");
