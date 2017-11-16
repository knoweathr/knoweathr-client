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
    if (w > 1000) {
      $('#login').removeClass('container');
      $('#login').show();
      $('#logintab').hide();
      $('#loginsubtext').hide();
      // add if on login page, redirect to index
      if (window.location.pathname === '/login') {
        page('/');
      }
      if (window.location.pathname === '/knoweathr-client/login') {
        page('/knoweathr-client/');
      }
    }
    else {
      $('#login').addClass('container');
      if (window.location.pathname === '/') $('#login').hide();
      else if (window.location.pathname === '/knoweathr-client/') $('#login').hide();
      else if (window.location.pathname === '/about') $('#login').hide();
      else if (window.location.pathname === '/knoweathr-client/about') $('#login').hide();
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
    $('#validationmsg').empty();
    login.username = $('#username').val().toLowerCase();
    login.password = $('#password').val().toLowerCase();

    $.get(`${__API_URL__}/login`, {'username': login.username, 'password': login.password})
      .then(
        data => {
          console.log(data);
          if (data === 'error'){
            $('#validationmsg').text('The username and password do not match.')
          } else {
            $('#loginform').text(`Welcome, ${login.username.toUpperCase()}`);
            $('#favorites').show();
            if (data === 'none') {
              console.log('data');
              $('#nosaved').show();
            }
          }
        }
      )

  })

  module.login = login;
})(app);
