$(document).ready(function() {
    var m = moment();
    var currentDate = m.format("MM/DD/YY");
    var dayOneForecast = m.add(1, 'day').format('MM/DD/YY');
    var dayTwoForecast = m.add(1, 'days').format('MM/DD/YY');
    var dayThreeForecast = m.add(1, 'days').format('MM/DD/YY');
    var dayFourForecast = m.add(1, 'days').format('MM/DD/YY');
    var dayFiveForecast = m.add(1, 'days').format('MM/DD/YY');


    $("#current-date").text(currentDate); 






    $(".card-title1").text(dayOneForecast);
    $(".card-title2").text(dayTwoForecast);
    $(".card-title3").text(dayThreeForecast);
    $(".card-title4").text(dayFourForecast);
    $(".card-title5").text(dayFiveForecast);


$("#search").on('click', function () {
event.preventDefault();
console.log("button was clicked");
var cityInput = $('#search-input').val();



console.log(cityInput);

var APIKey = "5335a9a467dcb8fc39f3df3fe333d51c";
// Building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + APIKey;
var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&cnt=5&units=imperial&appid=" + APIKey;
var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?q=" + cityInput + "&lat={lat}&lon={lon}&appid=" + APIKey;
// Run our AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
   
    console.log(queryURL);
    
    console.log(response);
   
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed + "mph");
    $(".humidity").text("Humidity: " + response.main.humidity + "%");
    $(".temp").text("Temperature (F): " + response.main.temp);
    $(".uv-index").text("UV-Index: " + response.main.UV);

    var weatherIcon = response.weather[0].icon;
    var weatherImgSrc = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
    var weatherImg = $('<img>');
    weatherImg.attr('src', weatherImgSrc);
    $('#weather-image').append(weatherImg);
    $("#weather-img img").attr("src", weatherImgSrc);

    localStorage.setItem("city search", cityInput);
    var citySearchStore = localStorage.getItem("city search");
    
    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
});
$.ajax({
    url: queryURL1,
    method: "GET"
}).then(function (response) {
    $(".city").html("<p>" + response.name + "<p>");
    $(".temp1").text("Temp: " + response.list[0].main.temp + "F");
    $(".temp2").text("Temp: " + response.list[1].main.temp + "F");
    $(".temp3").text("Temp: " + response.list[2].main.temp + "F");
    $(".temp4").text("Temp: " + response.list[3].main.temp + "F");
    $(".temp5").text("Temp: " + response.list[4].main.temp + "F");

    $(".humidity1").text("Humidity: " + response.list[0].main.humidity + "%");
    $(".humidity2").text("Humidity: " + response.list[1].main.humidity + "%");
    $(".humidity3").text("Humidity: " + response.list[2].main.humidity + "%");
    $(".humidity4").text("Humidity: " + response.list[3].main.humidity + "%");
    $(".humidity5").text("Humidity: " + response.list[4].main.humidity + "%");
    

    console.log("forecast URL: " + queryURL1);
    console.log("response 2: " + response);
    console.log("temperature: " + response.list[0].main.temp);

    
});
$.ajax({
    url: queryURL2,
    method: "GET"
}).then(function (response) {
    console.log(queryURL2);
    console.log(response);
});

})});