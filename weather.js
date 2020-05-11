let err = document.querySelector("#error");
let celsiusContainer = document.querySelector("#celsiusContainer");
let windContainer = document.querySelector("#windContainer");
let humidityContainer = document.querySelector("#humidityContainer");
let visibilityContainer = document.querySelector("#visibilityContainer");
let city = document.getElementById("cityContainer");
let iconContainer = document.querySelector("#weatherIcon");

$(document).ready(() => {
  $("#btn").click(() => {
    let inputCity = document.querySelector("#inputCity").value;
    let converter = "";
    let baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

    let key = "&appid=02065e9630fa5b4e7ce167ca9e4d7365";
    let units = "&units=metric";
    let url = baseUrl + inputCity + key + units;
    /* Complete API construced to display CITY with different values */
    // console.log(url);
    if (inputCity == "") {
      err.innerHTML = "Please enter a city!!!";
    } else {
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(res => {
          converter = `${res.main.temp}`;

          $("#celsiusContainer").html(converter + "&#176;");
          $("#cityContainer").html(
            inputCity.charAt(0).toUpperCase() + inputCity.slice(1)
          );

          converter = `${res.main.humidity}`;
          $("#humidityContainer").html(`<hr><p>Humidity</p><hr>${converter}`);

          converter = `${res.wind.speed}`;
          $("#windContainer").html(`<hr><p>KMH</p><hr> ${converter}`);

          converter = `${res.visibility}`;

          $("#visibilityContainer").html(
            `<hr><p>Visibility</p><hr> ${converter}`
          );

          /*  getting openWEATHER ICONS*/
          let iconCode = `${res.weather[0].icon}`;
          let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
          $("#weatherIcon").html(
            "<img src=http://openweathermap.org/img/wn/" +
              res.weather[0].icon +
              ".png>"
          );
        })
        .catch(err => console.log(err));
    }
  });
});
