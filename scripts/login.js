'use strict';

var app = app || {};

(function (module){

  const login = {};

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
          if (data === 'error'){
            $('#validationmsg').text('The username and password do not match.')
          } else {
            $('#loginform').text(`Welcome, ${login.username.toUpperCase()}`);
            $('#favorites').show();
            if (!data){
              $('#nosaved').show();
            }
          }
        }
      )

  })

  module.login = login;
})(app);
