const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather');
const weatherResult = document.getElementById('weather-result');
const successSound = document.getElementById('success-sound');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') {
        weatherResult.innerText = 'Please enter a city name.';
        return;
    }
    fetchWeather(city);
});

function fetchWeather(city) {
    const apiKey = "616af58c69097f389e13c645f0bcf3d3"; // Your API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    weatherResult.innerText = 'Loading...';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const weatherMain = data.weather[0].main;

            weatherResult.innerText = `Temperature: ${temp} °C\nCondition: ${desc}`;

            setBackground(weatherMain);
            successSound.play();
        })
        .catch(err => {
            weatherResult.innerText = err.message;
            document.body.style.backgroundImage = ''; // clear background on error
        });
}

function setBackground(weatherMain) {
    let imageUrl = '';

    switch (weatherMain.toLowerCase()) {
        case 'clear':
            imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80'; // sunny
            break;
        case 'clouds':
            imageUrl = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80'; // cloudy
            break;
        case 'rain':
        case 'drizzle':
            imageUrl = 'https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1350&q=80'; // rain
            break;
        case 'thunderstorm':
            imageUrl = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1350&q=80'; // thunderstorm
            break;
        case 'snow':
            imageUrl = 'https://images.unsplash.com/photo-1600596542815-d51ab7a18d44?auto=format&fit=crop&w=1350&q=80'; // snow
            break;
        case 'mist':
        case 'fog':
        case 'haze':
            imageUrl = 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80'; // fog/mist
            break;
        default:
            imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80'; // default sunny
    }

    document.body.style.backgroundImage = `url('${imageUrl}')`;
}
