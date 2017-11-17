'use strict';

var app = app || {};

(function (module){

  const login = {};

  login.favorites = [];

  login.toHtml = arr => {
  // arr is array of favorited objects
    $('#renderfavorites').empty();

    if (arr.length === 0) $('#nosaved').show();

    arr.forEach((el, i) => {
      let month = Object.keys(el)[6].slice(0,3).toUpperCase();

      $('#renderfavorites').prepend(`
        <ul class="savedlocations clearfix"><span class="savedlocationheader">${el.name} in ${month}</span><br />
          <li>Average High Temperature: ${Object.values(el)[6]}º</li>
          <li>Average Low Temperature: ${Object.values(el)[7]}º</li>
          <li>Chance of Sunny Day: ${Object.values(el)[8]}%</li>
          <li>Cloud Cover: ${Object.values(el)[9]}</li>
          <li>Elevation: ${el.elev}ft</li>
          <li class="deletelocation"><button onclick="app.login.deleteHandler(${i})">delete from favorites</button></li>
        </ul>
      `);
    });
    // if (mapView.loggedIn = true) $('#favorites').show();
    login.checkWindowSize();
  }

  login.deleteHandler = i => {
    login.favorites.splice(i, 1);
    let obj = {'username': app.login.username, 'favorites': JSON.stringify(app.login.favorites)};
    $.ajax({
      url: `${__API_URL__}/updatefavorites`, //eslint-disable-line
      method: 'PUT',
      data: obj,
    })
      .catch(err => console.error(err));
    login.toHtml(login.favorites);
  }

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

      $('#renderfavorites ul:nth-of-type(n+3)').hide();

      if ($('#renderfavorites ul').length > 2) {
        $('#showmore').show();
        $('#showless').hide();
        $('#nosaved').hide();
      }
      if ($('#renderfavorites ul').length <= 2) {
        $('#showmore').hide();
        $('#showless').hide();
        $('#nosaved').hide();
      }
      if ($('#renderfavorites ul').length === 0) {
        $('#nosaved').show();
      }

      $('#showmore').off('click');
      $('#showless').off('click');

      $('#showmore').on('click', () => {
        $('#renderfavorites ul').show();
        $('#showmore').hide();
        $('#showless').show();
      });

      $('#showless').on('click', () => {
        $('#renderfavorites ul:nth-of-type(n+3)').hide();
        $('#showmore').show();
        $('#showless').hide();
      });
    }
    else {
      $('#renderfavorites ul').show();
      $('#showmore').hide();
      $('#showless').hide();
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
    login.checkWindowSize();
    module.mapView.reset();
    $('#login').show();
  }

  // login event handler
  $('#loginbutton').on('click', function(e){
    e.preventDefault();
    $('#validationmsg').empty();
    login.username = $('#username').val().toLowerCase();
    login.password = $('#password').val().toLowerCase();

    $.get(`${__API_URL__}/login`, {'username': login.username, 'password': login.password}) //eslint-disable-line
      .then(
        data => {
          if (data === 'error'){
            $('#validationmsg').text('The username and password do not match.')
          } else {
            $('#loginform').html(`<br />Welcome, ${login.username.toUpperCase()}! <br /><a href="#" id="refresh">log out</a>`);
            $('#refresh').off('click');
            $('#refresh').on('click', () => window.location.reload());
            $('#favorites').show();
            if (data === 'none') {
              $('#nosaved').show();
            } else {
              $('#nosaved').hide();
              login.favorites = JSON.parse(data);
              login.toHtml(login.favorites);
            }
          }
        }
      )
  });

  module.login = login;
})(app);
