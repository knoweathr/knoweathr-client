if (window.location.pathname !== '/') {
  console.log('gh pages detected')
  page.base('/knoweathr-client')
}

page('/', ctx => app.mapView.initIndexPage(ctx));
page('/about', ctx => app.mapView.initAboutPage(ctx));
page('/login', ctx => app.login.initLoginPage(ctx))

if (window.innerWidth > 999 && window.location.pathname === '/login') {
  window.location = 'https://knoweathr.github.io/knoweathr-client/';
}

page();
