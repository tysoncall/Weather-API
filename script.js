var apiKey = "5335a9a467dcb8fc39f3df3fe333d51c";

var forecastID = [];
var forecastHigh = [];
var forecastLow = [];

// Background pictures
var clearDay = "url('http://hdwallpaperbackgrounds.net/wp-content/uploads/2015/07/Sunny-Bright-Day-Wallpaper-9.jpg')";
var clearNight = "url('http://wallpapercave.com/wp/FjnZ25X.jpg')";
var cloudyDay = "url('http://www.zastavki.com/pictures/1920x1200/2011/Nature_Mountains_Overcast_sky_above_the_mountains_031613_.jpg')";
var cloudyNight = "url('http://www.dailybackgrounds.com/wp-content/uploads/2015/01/full-moon-and-stars-in-cloudy-night.jpg')";
var rainy = "url('http://arthdwallpaper.com/wp-content/uploads/2015/11/Rain-Wallpaper-Free.gif')";
var snowy = "url('http://7-themes.com/data_images/out/63/6988434-winter-snow-wallpaper.jpg')";
var stormy = "url('http://www.minutemanups.com/blog/wp-content/uploads/2014/03/Storm-Clouds-54.jpg')";
var misty = "url('http://wallpoper.com/images/00/30/74/49/misty-landscape_00307449.jpg')";

$("#forecast-container").hide();
/* Since getCurrentPosition is an AJAX method, perform the
   main function as a callback. This ensures information
   is loaded before proceding. All other functions are
   nested within the main callback function. */
$.getJSON('https://freegeoip.net/json/')
  .then(function(position) {
    var latitude = position.latitude;
    var longitude = position.longitude;

    var currentQuery = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=Imperial" + "&APPID=" + apiKey;
    var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&units=Imperial" + "&APPID=" + apiKey;
  
    $.getJSON(currentQuery).then(function(weather) {
      var city = weather.name;
      var country = weather.sys.country;
      var weatherID = weather.weather[0].icon;
      var currentTemp = weather.main.temp;
      var highTemp = weather.main.temp_max;
      var lowTemp = weather.main.temp_min;
      var humidity = weather.main.humidity;
      var pressure = HPAToMMHG(weather.main.pressure);
      displayCurrentWeather(city, country, weatherID, currentTemp, highTemp, lowTemp, humidity, pressure);
    });
  
    $.getJSON(forecastQuery).then(function(weather) {
      var forecastID = [];
      var forecastHigh = [];
      var forecastLow = [];
      var city = weather.city.name;
      var country = weather.city.country;
      
      for (var i = 1; i <= 5; i++){
        forecastID.push(weather.list[i].weather[0].icon);
        forecastHigh.push(weather.list[i].temp.max);
        forecastLow.push(weather.list[i].temp.min);  
      }
      displayForecastWeather(city, country, forecastID, forecastHigh, forecastLow); 
    });
  });

function displayCurrentWeather(city, country, weatherID, currentTemp, highTemp, lowTemp, humidity, pressure){
  $(".city").empty().append(city);
  $(".country").empty().append(country);
  $("#current-temp").empty().append(parseInt(currentTemp));
  $("#high-temp").empty().append(parseInt(highTemp));
  $("#low-temp").empty().append(parseInt(lowTemp));
  $("#humidity").empty().append(humidity);
  $("#pressure").empty().append(pressure);
  $("#weather-icon-container").empty().append(getWeatherIcon(weatherID));
  $("body").css("background-image", getBackgroundImage(weatherID));
}

function displayForecastWeather(city, country, forecastID, forecastHigh, forecastLow){
  $(".city").empty().append(city);
  $(".country").empty().append(country);
  for (var i = 0; i < 5; i++){
    var fID = forecastID[i];
    var high = forecastHigh[i];
    var low = forecastLow[i];
    var element = "#forecast-day-" + (i + 1)
    $(element + "-icon").empty().append(getWeatherIcon(fID));
    if (high < 10 && high > -10){
      $(element + "-high").empty().append("&MediumSpace;&MediumSpace;" + parseInt(high))
    }
    else{
      $(element + "-high").empty().append(parseInt(high));
    }
    if (low < 10 && low > -10) {
      $(element + "-low").empty().append("&MediumSpace;&MediumSpace;" + parseInt(low));
    }
    else {
      $(element + "-low").empty().append(parseInt(low));
    }
  }
}

function HPAToMMHG(pressure){
  return parseInt(pressure / 33.8638866667);
}

function getWeatherIcon(id){
  switch(id){
    case "01d":
      return "<i class='wi wi-day-sunny'></i>";
      break;
    case "01n":
      return "<i class='wi wi-night-clear'></i>";
      break;
    case "02d":
      return "<i class='wi wi-day-cloudy'></i>";
      break;
    case "02n":
      return"<i class='wi wi-night-alt-cloudy'></i>";
      break;
    case "03d":
      return "<i class='wi wi-day-cloudy'></i>";
      break;
    case "03n":
      return "<i class='wi wi-night-alt-cloudy'></i>";
      break;
    case "04d":
      return "<i class='wi wi-day-cloudy'></i>";
      break;
    case "04n":
      return "<i class='wi wi-night-alt-cloudy'></i>";
      break;
    case "09d":
      return "<i class='wi wi-day-showers'></i>";
      break;
    case "09n":
      return "<i class='wi wi-night-alt-showers'></i>";
      break;
    case "10d":
      return "<i class='wi wi-day-rain'></i>";
      break;
    case "10n":
      return "<i class='wi wi-night-alt-rain'></i>";
      break;
    case "11d":
      return "<i class='wi wi-day-thunderstorm'></i>";
      break;
    case "11n":
      return "<i class='wi wi-night-alt-thunderstorm'></i>";
      break;
    case "13d":
      return "<i class='wi wi-day-snow'></i>";
      break;
    case "13n":
      return "<i class='wi wi-night-alt-snow'></i>";
      break;
    case "50d":
     return "<i class='wi wi-day-fog'></i>";
      break;
    case "50n":
      return "<i class='wi wi-night-fog'></i>";
      break;
    default:
      return "<i class='wi wi-day-clear'></i>";
  }
}

function getBackgroundImage(id){
  switch(id){
    case "01d":
      return clearDay;
      break;
    case "01n":
      return clearNight;
      break;
    case "02d":
      return cloudyDay;
      break;
    case "02n":
      return cloudyNight;
      break;
    case "03d":
      return cloudyDay;
      break;
    case "03n":
      return cloudyNight;
      break;
    case "04d":
      return cloudyDay;
      break;
    case "04n":
      return cloudyNight;
      break;
    case "09d":
      return rainy;
      break;
    case "09n":
      return rainy;
      break;
    case "10d":
      return rainy;
      break;
    case "10n":
      return rainy;
      break;
    case "11d":
      return stormy;
      break;
    case "11n":
      return stormy;
      break;
    case "13d":
      return snowy;
      break;
    case "13n":
      return snowy;
      break;
    case "50d":
      return misty;
      break;
    case "50n":
      return misty;
      break;
    default:
      return clearDay; 
  }
}

function showForecast(){
  $("#weather-container").slideToggle("fast");
  $("#forecast-container").slideToggle();
}

function showCurrent(){
  $("#forecast-container").slideToggle("fast");
  $("#weather-container").slideToggle();
}