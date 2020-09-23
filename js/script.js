//TODO: create variables that will be reused througout app.
//API key.

var key = "c2a8bcbf463282491b7f6924b3b7eb8a";
var city = "";
var lat = "";
var lon = "";

//TODO: Create ajax request for open weather API and make request to search for specific information.

$("#cityBtn").on("click", function (event) {
  event.preventDefault();

  city = $("#cityInput").val();

  //url to query open weather database.
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

  $.ajax({
    url: queryURL,
    method: "GET",
  })
  .then(function (response) {
    console.log(queryURL);
    console.log(response);

    var currentCity = $("<div>");
    currentCity.addClass("currentCity");
    $(".current").append(currentCity);

    var icon = $("<img>");
    icon.attr("src", response.weather.id)
    currentCity.append(icon)

    var cityName = $("<h5>");
    cityName.addClass("cityName");
    cityName.text(city + moment().format(" (M/D/YY)"));
    currentCity.append(cityName);

    var temp = $("<p>");
    temp.text("Temperature: " + response.main.temp + " F");
    currentCity.append(temp);

    var humidity = $("<p>");
    humidity.text("Humidity: " + response.main.humidity + "%");
    currentCity.append(humidity);

    var wind = $("<p>");
    wind.text("Wind Speed: " + response.wind.speed + " MPH");
    currentCity.append(wind);

    lat = response.coord.lat;
    lon = response.coord.lon;
  });

  var queryURLForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" +city+ "&units=imperial&appid=" + key;
  
  $.ajax({
      url: queryURLForcast,
      method: "GET"
  })
  .then(function (response) {
      console.log(response)
      var fiveDayH = $("<h5>");
      fiveDayH.text("5-Day Forcast:")
      $(".fiveDay").append(fiveDayH)

      for(i=0; i<=30; i+6){
        var forcast = $("<div>");
        forcast.addClass("col s2 blue lighten-3")
        $(".fiveDay").append(forcast)

        var fiveDate = $("<h6>");
        fiveDate.text(response.list[i].dt_txt)
        forcast.append(fiveDate)

        var fiveDayTemp = $("<p>");
        fiveDayTemp.text("temp: " + response.list[i].main.temp)
        forcast.append(fiveDayTemp);

        var fiveDayHumid = $("<p>");
        fiveDayHumid.text("temp: " + response.list[i].main.humidity)
        forcast.append(fiveDayHumid);
      }
  })
});
//TODO:Create click event

//TODO: tie function to button to search for city.

//TODO:View selected city.

//TODO: selected city should show name of city, current date, icon showing current weather, temp, humidity, windspeed and uv index.

//TODO:UV index should be displayed with a coresponding color indicating weather conditions are favorable, moderate, or severe.

//TODO: populate page with this information on page.

//TODO: Present a five day forcast for the city. Each day should display date, icon of weather, temp and humidity.

//TODO: populate dashboard with this information.

//TODO: Add current city to list of viewed citys using local storage.

//TODO: Last city viewed populates page when app is reopened.
