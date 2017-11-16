'use strict';

var app = app || {};

(function (module){

  const mapView = {};

  mapView.continents = {
    africa: {
      lat: 2.4726939,
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
      lat: -27.2852625,
      lng: -60.6089889,
    },
  }

  mapView.reset = () => {
    $('.container').hide();
  }

  mapView.initIndexPage = () => {
    mapView.reset();
    $('#map').hide();
    $('#home').show();
  }

  mapView.initAboutPage = () => {
    mapView.reset();
    $('#about').show();
  }

  mapView.initMap = () => {
    $('#map').fadeIn(1000);
    let $mapDiv = document.getElementById('map');
    let selection = module.weather.continentSelection;
    let latlng = new google.maps.LatLng(mapView.continents[selection].lat, mapView.continents[selection].lng);//eslint-disable-line
    let mapOptions =
    {
      zoom: 3,
      center:latlng,
    };
    var map = new google.maps.Map($mapDiv, mapOptions);//eslint-disable-line

    module.weather.filteredInfo.forEach(airport => {
      // setTimeout(function() {
        let position = new google.maps.LatLng(parseFloat(airport.lat), parseFloat(airport.lon)); //eslint-disable-line

      let pinStyle = '';
      let cond = Object.values(airport)[9];

      switch(cond) {
      case 'mostly sunny':
        pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
        break;
      case 'party cloudy':
        pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
        break;
      case 'rain':
        pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
        break;
      case 'mostly cloudy':
        pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
        break;
      case 'cloudy':
        pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
        break;
      case 'sunny':
        pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
        break;
      }

      let marker = new google.maps.Marker({ //eslint-disable-line
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        title: airport.name,
        // icon: pinStyle
        id: Object.values(airport)[0]
      })

      let contentString = `<div id="content"><div id="siteNotice"></div><h1 id="firtHeading">${Object.values(airport)[1]}</h1><div class="attribute">Expected high temp: ${Object.values(airport)[6]}</div><div class="attribute">Expected low temp: ${Object.values(airport)[7]}</div><div class="attribute">Forecast: ${Object.values(airport)[9]}</div><div class="attribute">Latitude: ${Object.values(airport)[3]}</div><div class="attribute">Longitude: ${Object.values(airport)[4]}</div><div id="addFavorite">Add Favorite</div></div>`;
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      $('#map').on('click', marker, function() {
        // let infowindow = '';
        // infowindow.setContent(contentString);
        infowindow.open($mapDiv, marker);
      });
      console.log(Object.values(airport)[8]);
      console.log(Object.values(airport)[9]);
      // console.log(Object.values(airport)[2]);
      // console.log(Object.values(airport)[3]);
      // console.log(Object.values(airport)[4]);
      // console.log(Object.values(airport)[5]);
      // console.log(Object.values(airport)[6]);
      // console.log(Object.values(airport)[7]);
      console.log("here are our our attributes");
      // console.log(airport.jul_cloud_cover_cond);
      // console.log(Object.values(airport)[9]);
      // console.log(Object.values(airport)[7]);
      // }, airport * 1000)

      // console.log(airport[may_cloud_cover_cond]);
    })
  }

  module.mapView = mapView;
})(app)
