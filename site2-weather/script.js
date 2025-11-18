// ==================== MOCK WEATHER DATA ====================
// This simulates API responses for different cities
const mockWeatherData = {
    'new york': {
        city: 'New York',
        country: 'United States',
        temp: 72,
        feelsLike: 70,
        condition: 'Clear Sky',
        description: 'Perfect day for outdoor activities!',
        icon: '☀️',
        windSpeed: 12,
        humidity: 65,
        visibility: 10,
        pressure: 1013,
        clouds: 20,
        sunrise: '6:30 AM',
        sunset: '7:45 PM',
        forecast: [
            { day: 'Tomorrow', date: 'Jan 19', icon: '⛅', high: 74, low: 62, condition: 'Partly Cloudy' },
            { day: 'Wednesday', date: 'Jan 20', icon: '🌧️', high: 68, low: 58, condition: 'Light Rain' },
            { day: 'Thursday', date: 'Jan 21', icon: '🌤️', high: 71, low: 60, condition: 'Mostly Sunny' },
            { day: 'Friday', date: 'Jan 22', icon: '☁️', high: 69, low: 59, condition: 'Cloudy' },
            { day: 'Saturday', date: 'Jan 23', icon: '☀️', high: 75, low: 63, condition: 'Sunny' }
        ]
    },
    'london': {
        city: 'London',
        country: 'United Kingdom',
        temp: 55,
        feelsLike: 52,
        condition: 'Cloudy',
        description: 'Typical London weather - bring an umbrella!',
        icon: '☁️',
        windSpeed: 15,
        humidity: 78,
        visibility: 8,
        pressure: 1010,
        clouds: 75,
        sunrise: '7:45 AM',
        sunset: '4:30 PM',
        forecast: [
            { day: 'Tomorrow', date: 'Jan 19', icon: '🌧️', high: 54, low: 48, condition: 'Rainy' },
            { day: 'Wednesday', date: 'Jan 20', icon: '⛈️', high: 52, low: 46, condition: 'Thunderstorms' },
            { day: 'Thursday', date: 'Jan 21', icon: '🌦️', high: 56, low: 49, condition: 'Showers' },
            { day: 'Friday', date: 'Jan 22', icon: '☁️', high: 57, low: 50, condition: 'Overcast' },
            { day: 'Saturday', date: 'Jan 23', icon: '⛅', high: 59, low: 51, condition: 'Partly Cloudy' }
        ]
    },
    'tokyo': {
        city: 'Tokyo',
        country: 'Japan',
        temp: 48,
        feelsLike: 45,
        condition: 'Partly Cloudy',
        description: 'Cool and pleasant weather',
        icon: '⛅',
        windSpeed: 8,
        humidity: 60,
        visibility: 10,
        pressure: 1018,
        clouds: 40,
        sunrise: '6:50 AM',
        sunset: '5:15 PM',
        forecast: [
            { day: 'Tomorrow', date: 'Jan 19', icon: '☀️', high: 52, low: 42, condition: 'Clear' },
            { day: 'Wednesday', date: 'Jan 20', icon: '🌤️', high: 54, low: 44, condition: 'Mostly Sunny' },
            { day: 'Thursday', date: 'Jan 21', icon: '☁️', high: 50, low: 41, condition: 'Cloudy' },
            { day: 'Friday', date: 'Jan 22', icon: '🌧️', high: 47, low: 39, condition: 'Rain' },
            { day: 'Saturday', date: 'Jan 23', icon: '⛅', high: 51, low: 43, condition: 'Partly Cloudy' }
        ]
    },
    'paris': {
        city: 'Paris',
        country: 'France',
        temp: 58,
        feelsLike: 56,
        condition: 'Mostly Sunny',
        description: 'Beautiful day in the City of Light!',
        icon: '🌤️',
        windSpeed: 10,
        humidity: 70,
        visibility: 9,
        pressure: 1015,
        clouds: 30,
        sunrise: '8:15 AM',
        sunset: '5:45 PM',
        forecast: [
            { day: 'Tomorrow', date: 'Jan 19', icon: '☀️', high: 61, low: 50, condition: 'Sunny' },
            { day: 'Wednesday', date: 'Jan 20', icon: '⛅', high: 59, low: 49, condition: 'Partly Cloudy' },
            { day: 'Thursday', date: 'Jan 21', icon: '☁️', high: 57, low: 48, condition: 'Cloudy' },
            { day: 'Friday', date: 'Jan 22', icon: '🌧️', high: 55, low: 47, condition: 'Light Rain' },
            { day: 'Saturday', date: 'Jan 23', icon: '🌤️', high: 60, low: 51, condition: 'Mostly Sunny' }
        ]
    },
    'sydney': {
        city: 'Sydney',
        country: 'Australia',
        temp: 82,
        feelsLike: 85,
        condition: 'Sunny',
        description: 'Perfect beach weather!',
        icon: '☀️',
        windSpeed: 14,
        humidity: 55,
        visibility: 10,
        pressure: 1012,
        clouds: 10,
        sunrise: '5:45 AM',
        sunset: '8:00 PM',
        forecast: [
            { day: 'Tomorrow', date: 'Jan 19', icon: '☀️', high: 84, low: 72, condition: 'Sunny' },
            { day: 'Wednesday', date: 'Jan 20', icon: '🌤️', high: 81, low: 70, condition: 'Mostly Sunny' },
            { day: 'Thursday', date: 'Jan 21', icon: '⛅', high: 79, low: 68, condition: 'Partly Cloudy' },
            { day: 'Friday', date: 'Jan 22', icon: '🌧️', high: 75, low: 65, condition: 'Showers' },
            { day: 'Saturday', date: 'Jan 23', icon: '⛈️', high: 73, low: 64, condition: 'Thunderstorms' }
        ]
    }
};

// ==================== STATE ====================
let currentUnit = 'F'; // F or C
let currentWeatherData = null;

// ==================== DOM ELEMENTS ====================
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const weatherContent = document.getElementById('weatherContent');
const welcomeMessage = document.getElementById('welcomeMessage');
const unitToggle = document.getElementById('unitToggle');
const currentDateEl = document.getElementById('currentDate');
const currentTimeEl = document.getElementById('currentTime');

// ==================== DATE & TIME ====================
function updateDateTime() {
    const now = new Date();

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateEl.textContent = now.toLocaleDateString('en-US', dateOptions);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    currentTimeEl.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

updateDateTime();
setInterval(updateDateTime, 1000);

// ==================== TEMPERATURE CONVERSION ====================
function fahrenheitToCelsius(f) {
    return Math.round((f - 32) * 5/9);
}

function celsiusToFahrenheit(c) {
    return Math.round((c * 9/5) + 32);
}

// ==================== FETCH WEATHER (Mock) ====================
async function fetchWeather(city) {
    // Show loading
    loading.classList.remove('hidden');
    weatherContent.classList.add('hidden');
    errorMessage.classList.add('hidden');
    welcomeMessage.classList.add('hidden');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const cityKey = city.toLowerCase().trim();
    const data = mockWeatherData[cityKey];

    loading.classList.add('hidden');

    if (!data) {
        // Show error
        errorMessage.classList.remove('hidden');
        document.getElementById('errorText').textContent =
            `Weather data for "${city}" not found. Try: New York, London, Tokyo, Paris, or Sydney`;
        return;
    }

    // Store current data
    currentWeatherData = data;
    displayWeather(data);
}

// ==================== DISPLAY WEATHER ====================
function displayWeather(data) {
    // Update current weather
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('country').textContent = data.country;
    document.getElementById('weatherCondition').textContent = data.condition;
    document.getElementById('weatherDetail').textContent = data.description;
    document.getElementById('weatherIconLarge').textContent = data.icon;

    updateTemperatureDisplay(data);

    // Update stats
    document.getElementById('windSpeed').textContent = `${data.windSpeed} mph`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('clouds').textContent = `${data.clouds}%`;
    document.getElementById('sunrise').textContent = data.sunrise;
    document.getElementById('sunset').textContent = data.sunset;

    // Update forecast
    displayForecast(data.forecast);

    // Show weather content
    weatherContent.classList.remove('hidden');
}

// ==================== UPDATE TEMPERATURE DISPLAY ====================
function updateTemperatureDisplay(data) {
    const temp = currentUnit === 'F' ? data.temp : fahrenheitToCelsius(data.temp);
    const feelsLike = currentUnit === 'F' ? data.feelsLike : fahrenheitToCelsius(data.feelsLike);

    document.getElementById('temperature').textContent = temp;
    document.querySelector('.temp-unit').textContent = `°${currentUnit}`;
    document.getElementById('feelsLike').textContent = `${feelsLike}°${currentUnit}`;

    unitToggle.textContent = currentUnit === 'F' ? 'Switch to °C' : 'Switch to °F';
}

// ==================== DISPLAY FORECAST ====================
function displayForecast(forecast) {
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';

    forecast.forEach(day => {
        const tempHigh = currentUnit === 'F' ? day.high : fahrenheitToCelsius(day.high);
        const tempLow = currentUnit === 'F' ? day.low : fahrenheitToCelsius(day.low);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-day">${day.day}</div>
            <div class="forecast-date">${day.date}</div>
            <div class="forecast-icon">${day.icon}</div>
            <div class="forecast-temp">
                <span class="temp-high">${tempHigh}°</span>
                <span class="temp-low">${tempLow}°</span>
            </div>
            <div class="forecast-condition">${day.condition}</div>
        `;
        forecastGrid.appendChild(card);
    });
}

// ==================== EVENT LISTENERS ====================
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

// Quick city chips
document.querySelectorAll('.city-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const city = chip.getAttribute('data-city');
        cityInput.value = city;
        fetchWeather(city);
    });
});

// Unit toggle
unitToggle.addEventListener('click', () => {
    currentUnit = currentUnit === 'F' ? 'C' : 'F';
    if (currentWeatherData) {
        updateTemperatureDisplay(currentWeatherData);
        displayForecast(currentWeatherData.forecast);
    }
});

// ==================== ANIMATIONS ====================
// Add stagger animation to forecast cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

// Observe forecast cards when they're added
const observeForecastCards = () => {
    document.querySelectorAll('.forecast-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
};

// Call this after forecast is displayed
const originalDisplayForecast = displayForecast;
displayForecast = function(forecast) {
    originalDisplayForecast(forecast);
    setTimeout(observeForecastCards, 100);
};

// ==================== CONSOLE MESSAGE ====================
console.log('%c🌦️ Weather Dashboard', 'color: #2196F3; font-size: 24px; font-weight: bold;');
console.log('%cNote: This app uses mock data. For real weather, integrate with OpenWeatherMap API', 'color: #666; font-size: 12px;');
console.log('%cTip: Add your API key and replace mock data with real fetch calls!', 'color: #4CAF50; font-size: 12px;');
