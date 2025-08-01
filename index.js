document.addEventListener('DOMContentLoaded', function() {
    // API configuration
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    
    // DOM elements
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const currentDate = document.getElementById('current-date');
    const temp = document.getElementById('temp');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const pressure = document.getElementById('pressure');
    
    // Set current date
    function updateDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDate.textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateDate();
    
    // Fetch weather data
    async function fetchWeather(city) {
        try {
            const response = await fetch(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            displayWeather(data);
            changeBackground(data.weather[0].main.toLowerCase());
        } catch (error) {
            alert(error.message);
            console.error('Error fetching weather data:', error);
        }
    }
    
    // Display weather data
    function displayWeather(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temp.textContent = Math.round(data.main.temp);
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;
        pressure.textContent = `${data.main.pressure} hPa`;
        
        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].main;
    }
    
    // Change background based on weather
    function changeBackground(weatherType) {
        const body = document.body;
        
        // Remove all weather classes
        body.classList.remove(
            'clear', 'clouds', 'rain', 'snow', 
            'thunderstorm', 'mist', 'haze', 'fog'
        );
        
        // Add appropriate class
        switch(weatherType) {
            case 'clear':
                body.classList.add('clear');
                break;
            case 'clouds':
                body.classList.add('clouds');
                break;
            case 'rain':
                body.classList.add('rain');
                break;
            case 'snow':
                body.classList.add('snow');
                break;
            case 'thunderstorm':
                body.classList.add('thunderstorm');
                break;
            case 'mist':
            case 'haze':
            case 'fog':
                body.classList.add('mist');
                break;
            default:
                // Default gradient stays
        }
    }
    
    // Event listeners
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
    
    // Default city on load
    fetchWeather('London');
});