'use strict';

var app = app || {};

(function (module){

  const mapView = {};

  const continents = {
    africa: {
      lat: ,
      lng: ,
      zoom: 4,
    },
    asia: {
      lat: ,
      lng: ,
      zoom: 4,
    },
    australia: {
      lat: ,
      lng: ,
      zoom: 4,
    },
    europe: {
      lat: ,
      lng: ,
      zoom: 4,
    },
    northAmerica: {
      lat: ,
      lng: ,
      zoom: 4,
    },
    southAmerica: {
      lat: ,
      lng: ,
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
