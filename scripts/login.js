'use strict';

var app = app || {};

(function (module){

  const login = {};

  login.initLoginPage = () => {
    module.mapView.reset();
    $('#login').show();
  }

  login.favorites = [];
  // array of objects
  // each object has properties: airport_code, month, airport_name, temp_high, temp_low, precipitation, cloud_cover_cond, elevation

  login.toHtml = function() {
    var template = Handlebars.compile($('#favorites-template').text());
    return template(this);
  }
  // app.login.favorites.forEach(location => $('#renderfavorites').append(location.toHtml()));
  // Set login.favorites to new array any time anything happens, and re-render toHtml.


  module.login = login;
})(app);
