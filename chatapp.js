let search_btn = document.querySelector(".search-btn");
let search_bar = document.querySelector(".search-bar");
let c_name = document.querySelector(".title");
let sunrise = document.querySelector(".r-time");
let sunset = document.querySelector(".se-time");
let humidity = document.querySelector(".humiditys");
let speed = document.querySelector(".wind-s");
let main = document.querySelector(".Main");
let clod = document.querySelector(".clod");
let w_icon = document.querySelector(".icons i");
let temprature = document.querySelector(".temp");
let descriptions = document.querySelector(".description");
let temp_min = document.querySelector(".temp_min");
let temp_max = document.querySelector(".temp_max");
let feel = document.querySelector(".feellike");
let pressure = document.querySelector(".pressure");
let longitude = document.querySelector(".longitude");
let latitude = document.querySelector(".latitude");
let apikey = '386cdb6cbe20a48b1282f8bc8bebade0';
let apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
search_btn.addEventListener('click', () => {

    check_weather(search_bar.value);

})
async function check_weather(city) {
    console.log(city)

    let response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        alert("wrong weather")
        search_bar.innerHTML = "";

    }
    else {
        let data = await response.json();
        console.log(data);




        // code for sunset and sunrise
        let sp = data.sys.sunset;
        let sps = data.sys.sunrise;
        const sunriseTimestamp = sp;
        const sunsetTimestamp = sps;

        // Create Date objects from the Unix Timestamps
        const sunriseDate = new Date(sunriseTimestamp * 1000);
        const sunsetDate = new Date(sunsetTimestamp * 1000);

        // Get the hours, minutes, and seconds
        const sunriseHours = sunriseDate.getHours();
        const sunriseMinutes = sunriseDate.getMinutes();
        const sunriseSeconds = sunriseDate.getSeconds();

        const sunsetHours = sunsetDate.getHours();
        const sunsetMinutes = sunsetDate.getMinutes();
        const sunsetSeconds = sunsetDate.getSeconds();

        // Format the time strings
        const formattedSunrise = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`;
        const formattedSunset = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`;

        c_name.innerHTML = data.name;
        if (sunriseHours >= 0 && sunriseHours <= 12) {
            sunrise.innerHTML = ` ${formattedSunrise} am`;
        }
        else if (sunriseHours >= 12 && sunriseHours <= 24) {
            sunrise.innerHTML = ` ${formattedSunrise} pm`;
        }


        if (sunsetHours >= 0 && sunsetHours <= 12) {
            sunset.innerHTML = ` ${formattedSunset} am`;
        }
        else if (sunsetHours >= 12 && sunsetHours <= 24) {
            sunset.innerHTML = ` ${formattedSunset} pm`;
        }

        humidity.innerHTML = data.main.humidity + '%';
        speed.innerHTML = data.wind.speed + 'kmh';
        main.innerHTML = data.weather[0].main;
        clod.innerHTML = data.clouds.all + '%';
        if (data.weather[0].main === "Rain") {
            w_icon.classList.remove("fa-sun")
            w_icon.classList.remove("fa-cloud-rain")
            w_icon.classList.remove("fa-clouds")
            w_icon.classList.add("fa-cloud-rain")
        }
        else if (data.weather[0].main === "Clouds") {
            w_icon.classList.remove("fa-sun")
            w_icon.classList.remove("fa-clouds")
            w_icon.classList.remove("fa-cloud-rain")
            w_icon.classList.add("fa-clouds")
        }
        else if (data.weather[0].main === "Clear") {
            w_icon.classList.remove("fa-sun")
            w_icon.classList.remove("fa-clouds")
            w_icon.classList.remove("fa-cloud-rain")
            w_icon.classList.add("fa-sun")
        }
        temprature.innerHTML = data.main.temp + '%';
        feel.innerHTML = data.main.feels_like + '%';
        descriptions.innerHTML = data.weather[0].description;
        temp_min.innerHTML = data.main.temp_min + '%';
        temp_max.innerHTML = data.main.temp_max + '%';
        pressure.innerHTML = data.main.pressure + 'pa';
        longitude.innerHTML = data.coord.lon + '%';
        latitude.innerHTML = data.coord.lat + '%';




    }
}



