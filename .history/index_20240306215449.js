// Replace with your OpenWeatherMap API key
const openWeatherMapApiKey = "7cbaf9080584e93d756d1e93ba5c46c8";

// Function to fetch weather data
const fetchWeather = async (city) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherMapApiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    return await response.json();
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

    const backgroundImages = {
        Rain: "https://i.pinimg.com/564x/6a/87/6d/6a876dff3367a87bd58d9fd872a04163.jpg",
        Clear: "https://i.pinimg.com/564x/94/08/44/940844fe0640eb63fdec1b90a72207cf.jpg",
        Clouds: "https://i.pinimg.com/564x/21/79/b1/2179b105685adb54de930280100ee0c9.jpg",
        Snow: "https://i.pinimg.com/564x/09/1a/03/091a03fcdb5b1dadf32436bf3079b662.jpg",
        Thunderstorm: "https://i.pinimg.com/564x/e2/e0/bd/e2e0bd405cdd73678727cf6b7c89d349.jpg",
        Fog: "https://i.pinimg.com/564x/62/77/70/6277707e8a7ff37fd5e6a0d4266e26e8.jpg",
        Windy: "https://i.pinimg.com/564x/f1/aa/0b/f1aa0b98bf38ef0e5ea4699cdb50105b.jpg"
    };

    let backgroundImageUrl = backgroundImages[weatherCondition];

    if (!backgroundImageUrl) {
        backgroundImageUrl = ""; 
    }

    body.style.backgroundImage = `url("${backgroundImageUrl}")`;
};

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.querySelector(".search-bar").value.trim();
    if (city) {
        fetchWeather(city)
            .then(data => updateUI(data))
            .catch(error => {
                console.error("Error fetching weather data:", error);
                alert("City not found. Please try again.");
            });
    } else {
        alert("Please enter a city name.");
    }
});
document.querySelector(".search-bar").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = document.querySelector(".search-bar").value.trim();
        if (city) {
            fetchWeather(city)
                .then(data => updateUI(data))
                .catch(error => {
                    console.error("Error fetching weather data:", error);
                    alert("City not found. Please try again.");
                });
        } else {
            alert("Please enter a city name.");
        }
    }
});
fetchWeather("Brooklyn,NY");
