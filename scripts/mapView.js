'use strict';

var app = app || {};
<<<<<<< HEAD
=======

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
>>>>>>> ebc17e300ba252826acba5282c84b2b4be07cd42
