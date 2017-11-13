'use strict';

var app = app || {};

(function (module){

  let mapView = {};

  mapView.reset = () => {
    $('.container').hide();
  }

  mapView.initIndexPage = () => {
    mapView.reset();
    $('#map').hide();
    $('#home').show();
    $('#fields').on('submit', event => {
      event.preventDefault();
      $('#map').show();
    })
  }

  mapView.initAboutPage = () => {
    mapView.reset();
    $('#about').show();
  }

  module.mapView = mapView;
})(app)
