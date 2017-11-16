'use strict';

var app = app || {};

(function (module){

  const login = {};

  login.favorites = [];
  // array of objects
  // each object has properties: airport_code, month, airport_name, temp_high, temp_low, precipitation, cloud_cover_cond, elevation

  login.toHtml = function() {
    $('#nosaved').hide();
    var template = Handlebars.compile($('#favorites-template').text());
    return template(this);
  }
  // app.login.favorites.forEach(location => $('#renderfavorites').append(location.toHtml()));
  // Set login.favorites to new array any time anything happens, and re-render toHtml.

  login.checkWindowSize = () => {
    let w = window.innerWidth;
    console.log(w);
    if (w > 1000) {
      $('#login').removeClass('container');
      $('#login').show();
      $('#logintab').hide();
      $('#loginsubtext').hide();
      // add if on login page, redirect to index
    }
    else {
      $('#login').addClass('container');
      $('#login').hide();
      $('#logintab').show();
      $('#loginsubtext').show();
    }
  }
  window.onload = login.checkWindowSize;
  $(window).resize(login.checkWindowSize);

  login.initLoginPage = () => {
    module.mapView.reset();
    $('#login').show();
  }

  // login event handler
  $('#loginbutton').on('click', function(e){
    e.preventDefault();
    login.username = $('#username').val().toLowerCase();
    login.password = $('#password').val().toLowerCase();

    $.get(`${__API_URL__}/login`, {'username': login.username, 'password': login.password})
      .then(console.log('great success'))

  })

  module.login = login;
})(app);
