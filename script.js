const API_KEY = "2bb37c2e5ca5f21764a49fe7bbe05291";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const weatherDiv = document.getElementById("weatherInfo");

    if (city === "") {
        weatherDiv.innerHTML = `<div class="error">❌ Please enter a city name!</div>`;
        weatherDiv.classList.remove("hidden");
        return;
    }

    weatherDiv.innerHTML = `<div class="weather">⏳ Loading...</div>`;
    weatherDiv.classList.remove("hidden");

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 404) {
            weatherDiv.innerHTML = `<div class="error">❌ City "${city}" not found!</div>`;
            return;
        }

        weatherDiv.innerHTML = `
            <div class="weather">
                <h2>📍 ${data.name}, ${data.sys.country}</h2>
                <div class="temp">${Math.round(data.main.temp)}°C</div>
                <div>🌡️ Feels like: ${Math.round(data.main.feels_like)}°C</div>
                <div class="details">
                    💧 Humidity: ${data.main.humidity}% | 💨 Wind: ${data.wind.speed} km/h
                </div>
                <div>☁️ ${data.weather[0].main}</div>
            </div>
        `;

    } catch (error) {
        weatherDiv.innerHTML = `<div class="error">❌ Network error! Check connection.</div>`;
    }
}

document.getElementById("city").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});