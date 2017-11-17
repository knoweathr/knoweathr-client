'use strict';

var app = app || {};

(function (module){

  const login = {};

  login.favorites = [];

  login.toHtml = arr => {
  // arr is array of favorited objects
    $('#renderfavorites').empty();
    arr.forEach((el, i) => {
      let month = Object.keys(el)[6].slice(0,3).toUpperCase();

      $('#renderfavorites').append(`
        <ul class="savedlocations clearfix"><span class="savedlocationheader">${el.name} in ${month}</span><br />
          <li>Average High Temperature: ${Object.values(el)[6]}º</li>
          <li>Average Low Temperature: ${Object.values(el)[7]}º</li>
          <li>Chance of Sunny Day: ${Object.values(el)[8]}%</li>
          <li>Cloud Cover: ${Object.values(el)[9]}</li>
          <li>Elevation: ${el.elev}ft</li>
          <li class="deletelocation"><button onclick="app.login.deleteHandler(${i})">delete location</button></li>
        </ul>
      `);
    });
    $('#favorites').show();

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

  // <!--Object.keys(app.weather.filteredInfo[0])[6].slice(0,3).toUpperCase()-->
  //
  //     <script id="favorites-template" type="text/x-handlebars-template">
  //       <ul class="savedlocations clearfix"><span class="savedlocationheader">{{name}} in {{month}}</span><br />
  //         <li>Average High Temperature: {{temp_high}}º</li>
  //         <li>Average Low Temperature: {{temp_low}}º</li>
  //         <li>Precipitation: {{precipitation}}%</li>
  //         <li>Cloud Cover: {{cloud_cover_cond}}</li>
  //         <li>Elevation: {{elevation}}</li>
  //         <li class="deletelocation">[<a href="#" id="">delete location</a>]</li>
  //       </ul>
  //     </script>


  // login.toHtml = function() {
  //   $('#nosaved').hide();
  //   var template = Handlebars.compile($('#favorites-template').text());
  //   return template(this);
  // }
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

    $.get(`${__API_URL__}/login`, {'username': login.username, 'password': login.password}) //eslint-disable-line
      .then(
        data => {
          if (data === 'error'){
            $('#validationmsg').text('The username and password do not match.')
          } else {
            $('#loginform').text(`Welcome, ${login.username.toUpperCase()}`);
            $('#favorites').show();
            if (data === 'none') {
              console.log('data');
              $('#nosaved').show();
            } else {
              login.favorites = JSON.parse(data);
              login.toHtml(login.favorites);
              // call the tohtml method to display data
            }
          }
        }
      )

  })

  module.login = login;
})(app);
