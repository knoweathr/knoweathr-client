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
      mapView.initMap();
      $('#map').show();
    })
  }

  mapView.initAboutPage = () => {
    mapView.reset();
    $('#about').show();
  }

  mapView.initMap = () => {
    let mapDiv = document.getElementById('map');
    let latlng = new google.maps.LatLng(-34.397, 150.644);//eslint-disable-line
    let mapOptions =
    {
      zoom: 4,
      center:latlng,
    };
    var map = new google.maps.Map(mapDiv, mapOptions);//eslint-disable-line
  }

  module.mapView = mapView;
})(app)
