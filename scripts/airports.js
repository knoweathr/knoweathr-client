'use strict'

var app = app || {};
(function (module) {
  Airport.all = [];

  function Airport(airport) {
    this.name = airport.name;
    this.lat = airport.lat;
    this.lng = airport.lng;
    this.temp = airport.temp;
  }

  Airport.loadAll = rows => {
    Airport.all = rows.map(airport => new Airport(airport))
  }

  Airport.fetchContinent = () => {
    $.get(`${__API_URL__}/api/v1/airports`)//eslint-disable-line
      .then(Airport.loadAll)
      .catch(console.error('damn you fd up'))
  }
  module.Airport = Airport;
})(app)
