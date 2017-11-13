'use strict';

var app = app || {};

(function (module){

  let mapView = {};

  mapView.reset = () => {
    $('.container').hide();
  }

  mapView.initIndexPage = () => {
    mapView.reset();
    $('#home').show();
  }

  mapView.initAboutPage = () => {
    mapView.reset();
    $('#about').show();
  }

  module.mapView = mapView;
})(app)
