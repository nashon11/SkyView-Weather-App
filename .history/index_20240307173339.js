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
            backgroundImageUrl = "https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            break;
        case "Clear":
            backgroundImageUrl = "https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            break;
        case "Clouds":
            backgroundImageUrl = "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D";
            break;
        case "Snow":
            backgroundImageUrl = "https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdpbnRlcnxlbnwwfHwwfHx8MA%3D%3D";
            break;
        case "Thunderstorm":
            backgroundImageUrl = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fHww";
            break;
        case "Fog":
            backgroundImageUrl = "https://images.unsplash.com/photo-1702893752430-a52f3335ceef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9nZ3klMjBzY2VuZXJ5fGVufDB8fDB8fHww";
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
