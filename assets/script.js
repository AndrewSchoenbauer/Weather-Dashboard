var cityInputEl = document.getElementById("cityInput")
var submitBtnEl = document.getElementById("#submitBtn");
var submitFormEl = document.getElementById("submitForm");
var nameEl = document.getElementById("city-name")
var currentPicEl = document.getElementById("current-pic");
var tempEl = document.getElementById("temperature");
var windEl = document.getElementById("wind-speed");
var humidityEl = document.getElementById("humidity");
var UVindexEl = document.getElementById("UV-index");
var historyEl = document.getElementById("history");
var forecastEl = document.querySelectorAll(".fiveForecast");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

clearHistoryEl = document.getElementById("clear-history");
var APIKey = "9460b1d09ea7e85f12aff702d92fa8cd";
var findCityHandler= function (e) {
    e.preventDefault();
    var cityName = cityInputEl.value
     console.log(cityName);
    if (cityName) {
        getWeather(cityName);
        getFivedayWeather(cityName);
        searchHistory.push(cityName);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
        cityInputEl.value= "";

    }
}
var getWeather = function (city) {
    var apiURL= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+APIKey;
    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            displayWeather(data, city);
            });
        } else {
                alert("Error" + response.statusText);
            }
        
    });
};
var getFivedayWeather = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+APIKey;
    fetch(forecastURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    displayfivedayWeather(data, city);
                });
            } else {
                alert("Error" + response.statusText);
            }
        });
};
var displayWeather = function (data, cityHandler) {
   
    var currentDate = new Date();
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    
    nameEl.textContent = cityHandler + "("+ month +"/"+ day +"/" + year + ")";
    var weatherPic = data.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt",data.weather[0].description);
    tempEl.textContent = "Tempurature: " + (data.main.temp) + "°F";
    humidityEl.textContent = "Humidity: " + (data.main.humidity) + "%";
    windEl.textContent = "Wind Speed: " + (data.wind.speed) + "MPH";
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    var UVapiURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1"
  fetch(UVapiURL)
  .then(function (response) {
      if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
              console.log(data);
              UVindexEl.textContent = "UV Index: " + (data[0].value);
                if ((data[0].value)<2) {
                    UVindexEl.setAttribute("class", "bg-success");
                } else if ((data[0].value)<5) {
                    UVindexEl.setAttribute("class", "bg-warning");
                } else {
                    UVindexEl.setAttribute("class", "bg-danger");
                }
            })
        };
    });
}
var displayfivedayWeather = function (data) {
    {
        for (i=0; i<forecastEl.length; i++) {
            forecastEl[i].textContent="";
            var fiveForecastIndex = i*8 + 4;
            var fiveDate = new Date(data.list[fiveForecastIndex].dt * 1000);
            var fiveDay = fiveDate.getDate();
            var fiveMonth = fiveDate.getMonth() + 1;
            var fiveYear = fiveDate.getFullYear();
            var forecastDate = document.createElement("p");
            forecastDate.setAttribute("class", "mb-3 forecast-date");
            forecastDate.textContent = fiveMonth + "/" + fiveDay + "/" + fiveYear;
            forecastEl[i].append(forecastDate);
            var fiveweatherPic= document.createElement("img");
            fiveweatherPic.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[fiveForecastIndex].weather[0].icon + "@2x.png");
            fiveweatherPic.setAttribute("alt", data.list[fiveForecastIndex].weather[0].description);
            forecastEl[i].append(fiveweatherPic);
            var fiveTemp = document.createElement("p");
            fiveTemp.textContent= "Temp: " + (data.list[fiveForecastIndex].main.temp)+ "°F";
            forecastEl[i].append(fiveTemp);
            var fiveWind = document.createElement("p");
            fiveWind.textContent= "Wind Speed: " + (data.list[fiveForecastIndex].wind.speed) + "MPH";
            forecastEl[i].append(fiveWind);
            var fiveHumidity = document.createElement("p");
            fiveHumidity.textContent= "Humidity: " +(data.list[fiveForecastIndex].main.humidity) + "%";
            forecastEl[i].append(fiveHumidity);
        
        }
        }
    }
       renderSearchHistory();
function renderSearchHistory() {
   historyEl.textContent = "";
   for (let i=0; i<searchHistory.length; i++){
       const cityHistory = document.createElement("input");
       cityHistory.setAttribute("type","text");
       cityHistory.setAttribute("readonly",true);
       cityHistory.setAttribute("class", "form-control d-block font-weight-bold border border-dark rounded bg-$cyan-200 mt-2");
       cityHistory.setAttribute("value", searchHistory[i]);
       cityHistory.addEventListener("click",function() {
           getWeather(cityHistory.value);
           getFivedayWeather(cityHistory.value);
           console.log(cityHistory.value);
       })
       historyEl.append(cityHistory);
   }
    }
    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1])
        getFivedayWeather(searchHistory[searchHistory.length - 1])
    }
    clearHistoryEl.addEventListener("click",function() {
        searchHistory = [];
        renderSearchHistory();
    })
submitFormEl.addEventListener('submit', findCityHandler);









