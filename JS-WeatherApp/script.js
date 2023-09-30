const userTab = document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")

const grantacsContainer = document.querySelector(".grant-container")
const searchForm = document.querySelector("[data-searchForm]")
const userinfo = document.querySelector(".userinfo-container")
const loadingScreen = document.querySelector(".loading-container")

let oldTab = userTab;
const API_KEY = "ea6e487129f2f08e8e5f55aa327ef378";
oldTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            userinfo.classList.remove("active");
            grantacsContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h 
            searchForm.classList.remove("active");
            userinfo.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});


function getfromSessionStorage (){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantacsContainer.classList.add("active");
    }

    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchWeatherinfo(coordinates);
    }
}


async function fetchWeatherinfo(coordinates){
    const {lat , lon} = coordinates;
    grantacsContainer.classList.remove("active");

    loadingScreen.classList.add("active");

    try{
        const response = await fetch(
            // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userinfo.classList.add("active");
        renderWeather(data);
    }
    catch(err){
        loadingScreen.classList.remove("active");
    }
}

function renderWeather (weatherInfo){
   
   
    const cityName = document.querySelector("[data-cityName]")
    const countryIcon = document.querySelector("[data-cityflag]")
    const desc = document.querySelector("[data-weatherDesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-temp]")
    const windSpeed = document.querySelector("[data-windSpeed]")
    const humidity = document.querySelector("[data-humidity]")
    const cloudiness = document.querySelector("[data-cloudiness]")

    console.log(weatherInfo);

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}


function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("geolocation feature not suppotred");
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchWeatherinfo(userCoordinates);

}

const grantaccessbtn = document.querySelector("[data-grantAccses]")

grantaccessbtn.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userinfo.classList.remove("active");
    grantacsContainer.classList.remove("active");

    try {
        const response = await fetch( 
        //    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userinfo.classList.add("active");
        renderWeather(data);
    }
    catch(err) {
        //hW
    }
}