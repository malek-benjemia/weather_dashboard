var userFormSearchEl = document.querySelector("#city-form-search");

var getCityWeather = function() {

  var city = document.querySelector("#city-name");
  // format the github api url
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=6&appid=9fa48a5c1cac63f3b2f805738b8815a8";

  // make a request to the url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data); // Then log the response in the console
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect to OpenWeatherMap.org");
  });
};

userFormSearchEl.addEventListener("click", getCityWeather);

