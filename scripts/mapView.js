'use strict';

var app = app || {};

(function (module){

  const mapView = {};

  const continents = {
    africa: {
      lat: 7.5801957,
      lng: 23.6492349,
      zoom: 4,
    },
    asia: {
      lat: 37.3351182,
      lng: 102.7507971,
      zoom: 4,
    },
    australia: {
      lat: -25.3640032,
      lng: 134.9627112,
      zoom: 4,
    },
    europe: {
      lat: 48.0911143,
      lng: 4.0994674,
      zoom: 4,
    },
    northAmerica: {
      lat: 31.6255973,
      lng: -146.6254652,
      zoom: 4,
    },
    southAmerica: {
      lat: -37.7397733,
      lng: -76.3224776,
      zoom: 4,
    },
  }

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
