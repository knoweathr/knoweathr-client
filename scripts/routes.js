if (window.location.pathname !== '/') {
  console.log('gh pages detected')
  page.base('/knoweathr-client')
}

page('/', ctx => app.mapView.initIndexPage(ctx));
page('/knoweathr-client/about', ctx => app.mapView.initAboutPage(ctx));
page('/login', ctx => app.login.initLoginPage(ctx))

page();
