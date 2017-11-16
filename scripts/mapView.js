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
    $('#map').fadeIn(3000);
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

      //here begins the attempt to switch into whatever month's weather is associated with the airport object
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
      // switch(airport.feb_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.mar_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.apr_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.may_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.jun_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.jul_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.aug_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.sep_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.oct_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.nov_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      // switch(airport.dec_cloud_cover_cond) {
      // case 'mostly sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // case 'party cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/pCloudy.jpg';
      //   break;
      // case 'rain':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/rainy.jpg';
      //   break;
      // case 'mostly cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'cloudy':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/cloudy.jpg';
      //   break;
      // case 'sunny':
      //   pinStyle = 'https://knoweathr.github.io/knoweathr-client/assets/icons/sunny.jpg';
      //   break;
      // }
      //here ends the aiport weather switch

      let marker = new google.maps.Marker({ //eslint-disable-line
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        title: airport.name,
        icon: pinStyle
      })
      // console.log(airport.jul_cloud_cover_cond);
      // console.log(airport);
      // }, airport * 1000)

      // console.log(airport[may_cloud_cover_cond]);
    })
  }

  module.mapView = mapView;
})(app)
