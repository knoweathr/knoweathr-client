'use strict';

var app = app || {};

(function (module){

  const mapView = {};

  mapView.continents = {
    africa: {
      lat: -4.4726939,
      lng: 21.7325174,
    },
    asia: {
      lat: 30.0787446,
      lng: 92.2115664,
    },
    australia: {
      lat: -25.7599689,
      lng: 137.2212573,
    },
    europe: {
      lat: 53.9194086,
      lng: 9.3056021,
    },
    northamerica: {
      lat: 34.6172354,
      lng: -93.6558639,
    },
    southamerica: {
      lat: -17.2852625,
      lng: -60.6089889,
    },
  }

  mapView.createMarkers = () => {
    //foreach of all markers to place markers on the map.
  }

  mapView.reset = () => {
    $('.container').hide();
  }

  mapView.initIndexPage = () => {
    mapView.reset();
    $('#map').hide();
    $('#home').show();
    // I put the on submit event after weather.filteredInfo so that the filteredInfo method completes with all of the relevant data that you need, before you initiate the map.
    // $('#fields').on('submit', event => {
    //   event.preventDefault();
    //   mapView.initMap();
    //   $('#map').show();
    // })
  }

  mapView.initAboutPage = () => {
    mapView.reset();
    $('#about').show();
  }

  mapView.initMap = () => {
    let $mapDiv = document.getElementById('map');
    let selection = module.weather.continentSelection;
    console.log(selection);
    let latlng = new google.maps.LatLng(mapView.continents[selection].lat, mapView.continents[selection].lng);//eslint-disable-line
    let mapOptions =
    {
      zoom: 3,
      center:latlng,
    };
    var map = new google.maps.Map($mapDiv, mapOptions);//eslint-disable-line
  }

  module.mapView = mapView;
})(app)
