var userFormSearchEl = document.querySelector("#city-form-search");
var d0TempEl = document.querySelector("#temprature");
var d0HumEl = document.querySelector("#humidity");
var d0WindEl = document.querySelector("#wind");
var d0UVEl = document.querySelector("#uv-index");



function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var time = date + ' ' + month + ' ' + year + ' ' + hour  ;
  return time;
}

var displayWeather = function(WeatherData) {
  // check if api returned any data
  if (WeatherData.length === 0) {
    alert("No data found.");
    return;
  };

  // loop over data
  for (var i = 0; i < WeatherData.length; i++) {
    console.log(i, timeConverter(WeatherData[i].dt));
    if (i==0){
      d0TempEl.textContent = WeatherData[i].main.temp;
      d0HumEl.textContent =WeatherData[i].main.humidity;
      d0WindEl.textContent =WeatherData[i].wind.speed;
      /*d0UVEl.textContent =WeatherData[i] ;*/
    };
  };
};

var getCityWeather = function(event) {
  event.preventDefault()
  var city = document.querySelector("#city-name").value;
  // format the github api url
  var apiUrl ="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=7b45126ef11a96be892cac454ac4ee41";

  // make a request to the url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayWeather(data.list);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })

    .catch(function(error) {
      alert("Unable to connect" + error);
    });
};

userFormSearchEl.addEventListener("click", getCityWeather);

