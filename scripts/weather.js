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

  // weather.fetchOne = () => {
  //   $.get('http://api.wunderground.com/api/a37659bb7884be58/planner_01010128/q/KJFK.json')
  //     .then(
  //       data => console.log(JSON.parse(data)),
  //       err => console.error(err.status, err.statusText, 'is the way my stuff is broken'));
  // }
  // weather.fetchOne();

  module.weather = weather;
})(app);
