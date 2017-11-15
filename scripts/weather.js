'use strict';

var app = app || {};
// const __API_URL__ = 'https://knoweathr.herokuapp.com'; //eslint-disable-line
const __API_URL__ = 'http://localhost:3000';

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
        $('#temperature').val(ui.values[0] + 'ºF - ' + ui.values[1] + 'ºF');
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
    let continent = $('#continent').find(':selected').text();
    let month = $('#month').find(':selected').text();
    let tempMin = $('#slider-range').slider('values', 0);
    let tempMax = $('#slider-range').slider('values', 1);
    console.log(continent, month, tempMin, tempMax);
  });

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
          console.log(data);
          console.log('hello');
          // weather.addToDB(JSON.parse(data));
        },
        err => console.error(err.status, err.statusText, 'is the way my stuff is broken'));
  }

  // continent is an array of [month, {continent: continent}]
  // app.weather.fetchContinent([jan, {continent: 'northamerica'}])
  // month needs to be in the format 01010128
  weather.fetchContinent = arr => {
    $.get(`${__API_URL__}/fetchcontinent`, arr[1])
      .then(
        data => {
          let airportArr = [];
          data.forEach(el => airportArr.push(el.airport_code))
          airportArr.forEach(el => weather.fetchOne({'airport_code': el, 'month': arr[0]}));
        },
        err => console.error(err.status, err.statusText, 'is the way my stuff is broken'));
  }

  module.weather = weather;
})(app);
