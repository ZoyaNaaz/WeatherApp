
const apiKey = "f96cb66ac772c8720b57f73e4dfd03ba"

document.getElementById('button').addEventListener('click', (e) => {
    e.preventDefault()
    //error display hide
    document.getElementById('error-display').innerHTML = "";
    document.getElementById('error-display').style.display = "none"; // Show error display if input is empty
    document.getElementById('error-display').classList.remove('error-display')
    document.querySelector(".city-display").classList.remove('shift-below');
    document.querySelector(".other").classList.remove('shift-above');
    const cityName = document.getElementById('search-bar').value;
    if (cityName) {
        getGeoCode(cityName);
       
    } else {
        console.log("Please enter a city name");
        document.getElementById('error-display').innerHTML = "Please enter a city name";
        document.getElementById('error-display').style.display = "block"; // Show error display if input is empty
        document.getElementById('error-display').classList.add('error-display') // Show error display if input is empty
    }
})
async function getGeoCode(city_name) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=5&appid=${apiKey}`);
    const data = await response.json()
    // console.log(data);
    //find an exact match (case-insensitive)
    const city = data.find(
        place => place.name.toLowerCase() === city_name.toLowerCase()
    );
    // console.log(city);
    if (city) {
        const latitude = city.lat;
        const longitude = city.lon;
        document.getElementById('error-display').style.display = "none"; // Hide error display if city is found
        getWeather(latitude, longitude);
        document.querySelector("#city-name-display").innerHTML = city.name
    }
    else {
        document.getElementById('error-display').style.display = "block";
        document.getElementById('error-display').innerHTML = "City not found. Please try again.";
        document.getElementById('error-display').classList.add('error-display')
        document.querySelector(".city-display").classList.add('shift-below');
        document.querySelector(".other").classList.add('shift-above');
        // console.log("City not found");
    }
}
let tempCelsius = null;
async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const data = await response.json()
    // console.log(data);
    tempCelsius = data.main.temp - 273.15; // Convert Kelvin to Celsius
    // create date
    const timeStamp = data.dt;
    const date = new Date(timeStamp * 1000);
    const dayName = date.toLocaleString('en-IN', { weekday: 'long' });
    //displaying API data
    document.querySelector("#temp-degree").innerHTML = Math.round(tempCelsius)
    document.getElementById("humidity").innerHTML = data.main.humidity;
    document.getElementById("wind").innerHTML = data.wind.speed;
    document.getElementById("weather-p").innerHTML = data.weather[0].description;
    document.getElementById("day-p").innerHTML = dayName;
    document.getElementById("rain-p").innerHTML = data.weather[0].main;
    document.getElementById("pressure").innerHTML = data.main.pressure;
    document.getElementById("feels-like").innerHTML = `${Math.floor(data.main.feels_like - 273.15)}°C`; // Convert Kelvin to Celsius


    const iconData = data.weather[0].main.toLowerCase();
    // console.log(iconData)
    switch (iconData) {
        case 'clouds':
            document.querySelector('#temp-icon').innerHTML = `<i class="fa-solid fa-cloud result-size"></i>`
            // console.log(object);
            // console.log(document.querySelector('.result>i').innerHTML);
            break;
        case 'rain':
            document.querySelector('#temp-icon').innerHTML = `<i class="fa-solid fa-cloud-rain result-size"></i>`
            break;
        case 'clear sky':
            document.querySelector('#temp-icon').innerHTML = `<i class="fa-solid fa-sun result-size"></i>`
            break;
        case 'thunderstorm':
            document.querySelector('#temp-icon').innerHTML = `<i class="fa-solid fa-cloud-bolt result-size"></i>`
            break;

        default:
            document.querySelector('#temp-icon').innerHTML = `<i class="fa-solid fa-cloud result-size"></i>`
            break;
    }
}

//convert temp 
document.getElementById('fahrenheit').addEventListener('click', () => {
    if(!tempCelsius) {
        document.getElementById('error-display').innerHTML = "Please search for a city first.";
        document.getElementById('error-display').style.display = "block"; // Show error display if no temperature is available
        return;
    }
    else{
        document.getElementById('temp-degree').innerHTML = Math.floor((tempCelsius * 9 / 5) + 32);
    }
})
document.getElementById('celcius').addEventListener('click', () => {
     if(!tempCelsius) {
        document.getElementById('error-display').innerHTML = "Please search for a city first.";
        document.getElementById('error-display').classList.add('error-display');
        document.getElementById('error-display').style.display = "block"; // Show error display if no temperature is available
        return;
    }
    else{
        document.getElementById('temp-degree').innerHTML = Math.floor(tempCelsius);
    }
})




// <i class="fa-solid fa-cloud-rain"></i> rain
// <i class="fa-solid fa-cloud"></i> cloud
// <i class="fa-solid fa-sun"></i> clear sky
// <i class="fa-solid fa-cloud-bolt"></i> thunderstorm
// <i class="fa-solid fa-wind"></i> wind
// <i class="fa-solid fa-temperature-half"></i> feels like
// 


  // Hide main content and show details when Details is clicked
  document.getElementById('details-link').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.details').style.display = 'block';
  });
