
let tempBox= document.querySelector(".temprature");
let cityBox= document.querySelector(".city");
let weatherBox= document.querySelector(".weather");
let windbox = document.querySelector(".wind");
let nextDay = document.querySelector("#forecast1");
let nextDay2 = document.querySelector("#forecast2");
let nextDay3 = document.querySelector("#forecast3");
let cityDropDown = document.querySelector(".countries");
let flags = document.querySelector(".flgImg");

const cityCountryCode = {
    "London": "GB",
    "Newyork": "US",
    "Chicago": "US",
    "Seattle": "US",
    "Houston": "US",
    "Philadelphia": "US",
    "San Diego": "US",
    "Dubai": "AE",
    "Beijing": "CN",
    "Tokyo": "JP",
    "Delhi": "IN",
    "Paris": "FR",
    "Mumbai": "IN",
    "Karachi": "PK",
    "Islamabad": "PK",
    "Lahore": "PK",
    "Agra": "IN",
    "Barcelona": "ES",
    "Bangkok": "TH", // corrected "Bankok" to "Bangkok"
    "Amsterdam": "NL",
    "Berlin": "DE",
    "Cairo": "EG",
    "Kolkata": "IN", // assuming you meant "Kolkata"
    "Dhaka": "BD",
    "Jeddah": "SA",
    "Moscow": "RU",
    "Tehran": "IR",
    "Baghdad": "IQ",
    "Singapore": "SG",
    "Madrid": "ES",
    "Faisalabad": "PK"

}
async function getWeather(city){
    const URL=("https://goweather.herokuapp.com/weather/"+city);  
    try{
    console.log("getting weather update.........")
     const response = await fetch(URL);
     const data = await response.json();
     console.log(data);
     tempBox.innerHTML=data.temperature;
     weatherBox.innerHTML=data.description;
     windbox.innerHTML=data.wind;
     cityBox.innerHTML=city;

     const boxes = [nextDay, nextDay2,  nextDay3];
     const forecastArray = data.forecast;
     for (let i = 0; i < forecastArray.length; i++) {
        const box = boxes[i];
        box.innerHTML = " ";

        const dayBoxElement = document.createElement("div");
        dayBoxElement.classList.add("nextdataBoxTitle");
        dayBoxElement.innerHTML = `Day: ${forecastArray[i].day}`;
        
        const tempElement = document.createElement("div");
        tempElement.classList.add("tempratureNextday");
        tempElement.innerHTML = forecastArray[i].temperature;

        const windElement = document.createElement("div");
        windElement.classList.add("windNextday");
        windElement.innerHTML = forecastArray[i].wind;

            box.appendChild(dayBoxElement);
           box.appendChild(tempElement);  
           box.appendChild(windElement);   
                         }
     const countryCode= cityCountryCode[city];
     console.log("code for " + city + " is " + countryCode);

     const flagURL= "https://flagsapi.com/"+ countryCode +"/shiny/64.png";
     flags.src=flagURL;
     console.log(countryCode);
     console.log(city);
    }
     catch(error){
          console.error("Error Fetching Weather Data: ", error);
                 }
    };

    cityDropDown.addEventListener("change",(event)=>{
        const selectedCity = event.target.value;
        getWeather(selectedCity);
    })
    getWeather(cityDropDown.value);