'use strict';

var app = app || {};
var __API_URL__ = 'https://knoweathr.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';

$(function(module) {

  var weather = {};

  weather.slider = () => {
    $('#slider-range').slider({
      range: true,
      min: 32,
      max: 90,
      values: [32, 90],
      slide: function(event, ui) {
        $('#temperature').val(ui.values[0] + 'ºF - ' + ui.values[1] + 'ºF');
      }
    });
    $('#temperature').val($('#slider-range').slider('values', 0) +
      'ºF - ' + $('#slider-range').slider('values', 1) + 'ºF');
    // // Calling min and max
    // $('#slider-range').slider('values', 0);
    // $('#slider-range').slider('values', 1);
  }

  module.weather = weather;
})(app);
