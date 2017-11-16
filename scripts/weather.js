'use strict';

var app = app || {};
const __API_URL__ = 'https://knoweathr.herokuapp.com'; //eslint-disable-line
// const __API_URL__ = 'http://localhost:3000';

(function(module) {

  const weather = {};

  weather.slider = () => {
    $('#slider-range').slider({
      range: true,
      min: 32,
      max: 100,
      step: 2,
      values: [32, 100],
      slide: function(event, ui) {
        let degF1 = 'ºF - ';
        let degF2 = 'ºF';
        if (ui.values[0] === 32) degF1 = 'ºF or less - ';
        if (ui.values[1] === 100) degF2 = 'ºF or more';
        console.log(degF1);
        $('#temperature').val(ui.values[0] + degF1 + ui.values[1] + degF2);
      }
    });
    $('#temperature').val($('#slider-range').slider('values', 0) +
      'ºF or less - ' + $('#slider-range').slider('values', 1) + 'ºF or more');
    // // Calling min and max
    // $('#slider-range').slider('values', 0);
    // $('#slider-range').slider('values', 1);
  }
  weather.slider();

  $('#continent').on('change', event => {
    weather.continentSelection = event.target.value;
  })

  $('#fields').on('submit', function(e) {
    e.preventDefault();
    let continent = $('#continent').find(':selected').val();
    weather.month = $('#month').find(':selected').val();
    weather.filteredArr = [];
    weather.count = 0;
    weather.tempMin = $('#slider-range').slider('values', 0);
    weather.tempMax = $('#slider-range').slider('values', 1);
    if (weather.tempMin === 32) weather.tempMin = -100;
    if (weather.tempMax === 100) weather.tempMax = 200;
    weather.fetchContinent([weather.month, {'continent': continent}]);
    // weather.getFilteredInfo(weather.filteredArr);
  });

  weather.filterAirports = arr => {
    // arr is [airport_code, {key: high_temp}, month]
    let temp = Number(arr[1][Object.keys(arr[1])[0]]);
    if (temp >= weather.tempMin && temp <= weather.tempMax) weather.filteredArr.push([arr[0], arr[2]]);
    weather.count++;

    // 10 is the number of airports in each continent in our JSON file. This count should be updated if we add more airports. This is the janky way of making sure that weather.filteredArr is completely populated before the getFilteredInfo method runs asyncronously.
    if (weather.count === 10) {
      console.log(weather.filteredArr);
      weather.getFilteredInfo(weather.filteredArr);
    }
  }

  weather.getFilteredInfo = (arr, callback) => {
    // arr is an array of arrays. arr[0] is airport codes that meet the temperature criteria and arr[1] is the month requested.
    weather.filteredInfo = [];
    arr.forEach(el => {
      $.get(`${__API_URL__}/getfilteredinfo`, {'airport_code': el[0], 'month': el[1]})
        .then(
          data => {
            // weather.filteredInfo is an array of objects. Each object contains information for the relevant airports in the user's search criteria. Use weather.filteredInfo to populate the map.
            weather.filteredInfo.push(data[0]);
          },
          err => console.error(err)
        )
        .then(() => app.mapView.initMap());
    })
    // app.mapView.initMap();
  }

  weather.fetchOne = obj => {
    // obj is {airport_code: airport_code, month: month}
    let monthnumbers = '';
    switch(obj.month) {
    case 'jan':
      monthnumbers = '01010131';
      break;
    case 'feb':
      monthnumbers = '02010228';
      break;
    case 'mar':
      monthnumbers = '03010331';
      break;
    case 'apr':
      monthnumbers = '04010430';
      break;
    case 'may':
      monthnumbers = '05010531';
      break;
    case 'jun':
      monthnumbers = '06010630';
      break;
    case 'jul':
      monthnumbers = '07010731';
      break;
    case 'aug':
      monthnumbers = '08010831';
      break;
    case 'sep':
      monthnumbers = '09010930';
      break;
    case 'oct':
      monthnumbers = '10011031';
      break;
    case 'nov':
      monthnumbers = '11011130';
      break;
    case 'dec':
      monthnumbers = '12011231';
      break;
    }

    $.get(`${__API_URL__}/fetchone`, {'airport_code': obj.airport_code, 'month': obj.month, 'monthnumbers': monthnumbers})
      .then(
        data => {
          console.log(obj.airport_code, data);
          weather.filterAirports([obj.airport_code, data, obj.month]);
        },
        err => console.error(err.status, err.statusText, 'is the way my stuff is broken'));
  }

  // arr is an array of [month, {continent: continent}]
  // app.weather.fetchContinent([jan, {continent: 'northamerica'}])
  weather.fetchContinent = arr => {
    $.get(`${__API_URL__}/fetchcontinent`, arr[1])
      .then(
        data => {
          let airportsInContinent = [];
          data.forEach(el => airportsInContinent.push(el.airport_code))
          airportsInContinent.forEach(el => weather.fetchOne({'airport_code': el, 'month': arr[0]}));
        },
        err => console.error(err));
  }

  module.weather = weather;
})(app);
