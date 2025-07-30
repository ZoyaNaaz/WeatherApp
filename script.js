const apiKey = "f96cb66ac772c8720b57f73e4dfd03ba"

document.getElementById('button').addEventListener('click', (e)=>{
    e.preventDefault()
    const cityName = document.getElementById('search-bar').value;
    if(cityName) {  
        getGeoCode(cityName);
        document.getElementById('search-bar').value = ''; // Clear the input field after search
    } else {
        console.log("Please enter a city name");
    }
})
async function getGeoCode(city_name){
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${apiKey}`);
    const data = await response.json()

   if(data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        // console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        document.getElementById('error-display').style.display = "none"; // Hide error display if city is found
        getWeather(lat, lon);
    }   
    else {
        document.getElementById('error-display').style.display = "block"; // Show error display if city is not found
        document.getElementById('error-display').innerHTML = "City not found. Please try again.";
        document.getElementById('error-display').style.color = "#ecaeaeff";
        document.getElementById('error-display').style.fontSize = "12px";
        document.getElementById('error-display').style.marginTop = "5px";
        document.getElementById('error-display').style.textAlign = "center";
        document.getElementById('error-display').style.transition = "2s ease-in";

        console.log("City not found");
    }
}

async function getWeather(lat, lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const data = await response.json()
    const tempCelsius = data.main.temp - 273.15; // Convert Kelvin to Celsius
    console.log(Math.round(tempCelsius) + "°C");
    console.log(data);
    // create date
    const timeStamp = data.dt;
    const date = new Date(timeStamp * 1000);
    const dayName = date.toLocaleString('en-IN', { weekday: 'long' });
    
    document.querySelector("#temp-degree").innerHTML = Math.round(tempCelsius)
    document.querySelector("#city-name-display").innerHTML = data.name
    document.getElementById("humidity").innerHTML = data.main.humidity;
    document.getElementById("wind").innerHTML = data.wind.speed;
    document.getElementById("weather-p").innerHTML = data.weather[0].description;
    document.getElementById("day-p").innerHTML = dayName;
    document.getElementById("rain-p").innerHTML = data.weather[0].main;
    document.getElementById("pressure").innerHTML = data.main.pressure;
    document.getElementById("feels-like").innerHTML = `${Math.floor(data.main.feels_like - 273.15)}°C`; // Convert Kelvin to Celsius
    //convert temp 
    document.getElementById('fahrenheit').addEventListener('click', ()=>{
        document.getElementById('temp-degree').innerHTML = Math.floor((tempCelsius*9/5) + 32);
    })
    document.getElementById('celcius').addEventListener('click', ()=>{
        document.getElementById('temp-degree').innerHTML = Math.floor(tempCelsius);
    })

    const iconData = data.weather[0].main.toLowerCase();
    // console.log(iconData)
    switch (iconData) {
        case 'clouds':
            document.querySelector('.result>i').innerHTML = `<i class="fa-solid fa-cloud"></i>`
            // console.log(object);
            break;
        case 'rain':
            document.querySelector('.result>i').innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
            break;
        case 'clear sky':
            document.querySelector('.result>i').innerHTML = `<i class="fa-solid fa-sun"></i>`
            break;
        case 'thunderstorm':
            document.querySelector('.result>i').innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`
            break;
            
            default:
            document.querySelector('.result>i').innerHTML = `<i class="fa-solid fa-cloud"></i>`
            break;
    }
}


// <i class="fa-solid fa-cloud-rain"></i> rain
// <i class="fa-solid fa-cloud"></i> cloud
// <i class="fa-solid fa-sun"></i> clear sky
// <i class="fa-solid fa-cloud-bolt"></i> thunderstorm
// <i class="fa-solid fa-wind"></i> wind
// <i class="fa-solid fa-temperature-half"></i> feels like
// 