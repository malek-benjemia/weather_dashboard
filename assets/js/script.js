var cityFormSearchEl = document.querySelector("#city-form-search");

var cityNameEl = document.querySelector("#city-detail");

var d0DateEl= document.querySelector("#date0") ; 
var d0IconEl= document.querySelector("#meteo0") ;
var d0TempEl = document.querySelector("#temprature");
var d0HumEl = document.querySelector("#humidity");
var d0WindEl = document.querySelector("#wind");
var d0UVEl = document.querySelector("#uv-index");

var d1DateEl= document.querySelector("#date1") ;
var d1IconEl= document.querySelector("#meteo1") ;
var d1TempEl= document.querySelector("#temp1");
var d1HumEl= document.querySelector("#hum1") ;

var d2DateEl= document.querySelector("#date2") ;
var d2IconEl= document.querySelector("#meteo2") ;
var d2TempEl= document.querySelector("#temp2");
var d2HumEl= document.querySelector("#hum2") ;

var d3DateEl= document.querySelector("#date3") ;
var d3IconEl= document.querySelector("#meteo3") ;
var d3TempEl= document.querySelector("#temp3");
var d3HumEl= document.querySelector("#hum3") ;

var d4DateEl= document.querySelector("#date4") ;
var d4IconEl= document.querySelector("#meteo4") ;
var d4TempEl= document.querySelector("#temp4");
var d4HumEl= document.querySelector("#hum4") ;

var d5DateEl= document.querySelector("#date5") ;
var d5IconEl= document.querySelector("#meteo5") ;
var d5TempEl= document.querySelector("#temp5");
var d5HumEl= document.querySelector("#hum5") ;

// convert unix time to normal time
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = date + '/' + month + '/' + year  ;
  return time;
}

// save the city to history and local storage
var saveCity = function(city){
  cityNameEl.textContent =city;
  /*cityArray.pop(city);*/
};

// call open weather map to get the UV
var getCityUV =  async function(lat,long) {
  var uvidx = null;
  // format the github api url
  var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&appid=7b45126ef11a96be892cac454ac4ee41";

  // make a request to the url
  await fetch(apiUrl)
    .then(async function(response) {
      // request was successful
      if (response.ok) {
          await response.json().then(async function(data) {
          uvidx= await data.current.uvi;
        })
      };
    });
  
  return uvidx;
  
};

// display the weather elements for today and the next 5 days
var displayWeather = async function(WeatherData) {
  // check if api returned any data
  if (WeatherData.list.length === 0) {
    alert("No data found.");
    return;
  };

  // loop over data
  for (var i = 0; i < WeatherData.list.length; i++) {
    
    if (i==0){
      var tempFar =Math.round( 10*((parseFloat(WeatherData.list[i].main.temp) - 273.15) * (9/5) + 32) )/10 ;
      d0DateEl.textContent =  timeConverter(WeatherData.list[i].dt) ;
      d0IconEl.innerHTML = "<img class='resize' src=http://openweathermap.org/img/wn/"+WeatherData.list[i].weather[0].icon+"@2x.png>" ;
      d0TempEl.textContent =  tempFar + " °F";
      d0HumEl.textContent = WeatherData.list[i].main.humidity +"%";
      d0WindEl.textContent = WeatherData.list[i].wind.speed +" MPH";
      var lat =WeatherData.city.coord.lat;
      var long =WeatherData.city.coord.lon;
      d0UVEl.textContent = await getCityUV(lat,long)  ;
    }; 
    if (i==5){
      var tempFar =Math.round( 10*((parseFloat(WeatherData.list[i].main.temp) - 273.15) * (9/5) + 32) )/10 ;
      d1DateEl.textContent = timeConverter(WeatherData.list[i].dt) ;
      d1IconEl.innerHTML = "<img class='resize' src=http://openweathermap.org/img/wn/"+WeatherData.list[i].weather[0].icon+"@2x.png>" ;
      d1TempEl.textContent =  tempFar + " °F";
      d1HumEl.textContent = WeatherData.list[i].main.humidity +"%";
    };
    if (i==13){
      var tempFar =Math.round( 10*((parseFloat(WeatherData.list[i].main.temp) - 273.15) * (9/5) + 32) )/10 ;
      d2DateEl.textContent = timeConverter(WeatherData.list[i].dt) ;
      d2IconEl.innerHTML = "<img class='resize' src=http://openweathermap.org/img/wn/"+WeatherData.list[i].weather[0].icon+"@2x.png>" ;
      d2TempEl.textContent =  tempFar + " °F";
      d2HumEl.textContent = WeatherData.list[i].main.humidity +"%";
    };
    if (i==21){
      var tempFar =Math.round( 10*((parseFloat(WeatherData.list[i].main.temp) - 273.15) * (9/5) + 32) )/10 ;
      d3DateEl.textContent = timeConverter(WeatherData.list[i].dt) ;
      d3IconEl.innerHTML = "<img class='resize' src=http://openweathermap.org/img/wn/"+WeatherData.list[i].weather[0].icon+"@2x.png>" ;
      d3TempEl.textContent =  tempFar + " °F";
      d3HumEl.textContent = WeatherData.list[i].main.humidity +"%";
    };
    if (i==29){
      var tempFar =Math.round( 10*((parseFloat(WeatherData.list[i].main.temp) - 273.15) * (9/5) + 32) )/10 ;
      d4DateEl.textContent = timeConverter(WeatherData.list[i].dt) ;
      d4IconEl.innerHTML = "<img class='resize' src=http://openweathermap.org/img/wn/"+WeatherData.list[i].weather[0].icon+"@2x.png>" ;
      d4TempEl.textContent =  tempFar + " °F";
      d4HumEl.textContent = WeatherData.list[i].main.humidity +"%";
    };
    if (i==37){
      var tempFar =Math.round( 10*((parseFloat(WeatherData.list[i].main.temp) - 273.15) * (9/5) + 32) )/10 ;
      d5DateEl.textContent = timeConverter(WeatherData.list[i].dt) ;
      d5IconEl.innerHTML = "<img class='resize' src=http://openweathermap.org/img/wn/"+WeatherData.list[i].weather[0].icon+"@2x.png>" ;
      d5TempEl.textContent =  tempFar + " °F";
      d5HumEl.textContent = WeatherData.list[i].main.humidity +"%";
    };


  };
};

// call open weather map to get the weather details
var getCityWeather = function(event) {
  event.preventDefault()
  var city = document.querySelector("#city-name").value;

  // check if there is a string in the city name field
  if (city.length === 0) {
    alert("Please enter a city.");
    return;
  };

  // format the github api url
  var apiUrl ="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=7b45126ef11a96be892cac454ac4ee41";

  // make a request to the url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          saveCity(city);
          displayWeather(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })

    .catch(function(error) {
      alert("Unable to connect" + error);
    });
};

// click the search button
cityFormSearchEl.addEventListener("click", getCityWeather);

