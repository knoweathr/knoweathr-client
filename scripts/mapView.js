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
    $('#map').fadeIn( 3000, function() {
    $( 'span' ).fadeIn( 100 );
  });
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
        // let airportProperty = `${module.weather.month}_cloud_cover_cond`;
        // let pinStyle = '';
        // switch(airport[airportProperty].value) {
        //   case 'mostly sunny':
        //     pinStyle = '../assets/icons/sunny.jpg';
        //     break;
        //   case 'party cloudy':
        //     pinStyle = '../assets/icons/pCloudy.jpg';
        //     break;
        //   case 'rain':
        //     pinStyle = '../assets/icons/rainy.jpg';
        //     break;
        //   case 'mostly cloudy':
        //     pinStyle = '../assets/icons/cloudy.jpg';
        //     break;
        //   };
          //here ends the aiport weather switch

      let marker = new google.maps.Marker({ //eslint-disable-line
          position: position,
          map: map,
          animation: google.maps.Animation.DROP,
          title: airport.name,
          // icon: pinStyle
        })
        console.log(airport);

      // }, airport * 1000)

      // console.log(airport[may_cloud_cover_cond]);
    })
  }

  module.mapView = mapView;
})(app)
