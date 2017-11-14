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

  mapView.continentSelectionHandler = () => {
    return module.weather.continentSelection.toLowerCase().split(' ').join('');
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
    app.Airport.fetchContinent();
    let $mapDiv = $('map');
    let selection = mapView.continentSelectionHandler();
    let latlng = new google.maps.LatLng(mapView.continents[selection].lat, mapView.continents[selection].lng);//eslint-disable-line
    let mapOptions =
    {
      zoom: 3,
      center:latlng,
    };
    var map = new google.maps.Map($mapDiv, mapOptions);//eslint-disable-line

    app.Airport.all.forEach(airport => {
      let position = new google.maps.LatLng(airport.lat, airport.lng);//eslint-disable-line
      bounds.extend(position);//eslint-disable-line
      airport = new google.maps.Marker({//eslint-disable-line
        position: position,
        map: map,
        title: airport.name,
      });
    })
  }

  module.mapView = mapView;
})(app)
