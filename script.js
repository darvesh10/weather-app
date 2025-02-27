const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const url = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        displayError("Please enter a city name.");
    }
});

async function getWeather(city) {
    const apiUrl = `${url}?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('error-message').textContent = "";
    document.getElementById('city-name').textContent = `Weather in ${data.name}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('weather-result').style.display = 'block';
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('weather-result').style.display = 'none';
}