'use strict';

var app = app || {};

(function (module){

  const login = {};

  login.initLoginPage = () => {
    module.mapView.reset();
    $('#login').show();
  }

  module.login = login;
})(app);
