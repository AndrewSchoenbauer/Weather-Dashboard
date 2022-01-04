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
var APIKey = "9460b1d09ea7e85f12aff702d92fa8cd";
var findCityHandler= function (e) {
    e.preventDefault();
    var cityName = cityInputEl.value
    // var cityName = {
    //     City: cityInputEl.value
    // };
    // localStorage.setItem("cityName", JSON.stringify(cityName));
    // renderMessage();

    console.log(cityName);
    if (cityName) {
        getWeather(cityName);
        cityInputEl.value= "";
    }
}
var getWeather = function (city) {
    var apiURL= "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+APIKey;
    fetch(apiURL)
    .then(function (response) {
        if (response.ok) {
            // console.log(response);
           
            response.json().then(function (data) {
                // console.log(data);
                displayWeather(data, city);
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
          

          })
      }
    })
}
// function renderMessage() {
//     var lastSearch = JSON.parse(localStorage.getItem("cityName"));
//     if (lastSearch !==null) {
//         document.querySelector("historyEl").textContent = lastSearch.City
        
//     }
    

submitFormEl.addEventListener('submit', findCityHandler);
// submitBtnEl.addEventListener("click",function() {
//     const searchTerm = cityInputEl.value;
//     getWeather(searchTerm);
//     searchHistory.push(searchTerm);
//     localStorage.setItem("search",JSON.stringify(searchHistory));
//     renderSearchHistory();
// })









