if (window.location.pathname !== '/') {
  console.log('gh paged detected')
  page.base('/knoweathr-client')
}

page('/', ctx => app.mapView.initIndexPage(ctx));
page('/about', ctx => app.mapView.initAboutPage(ctx));
page('/login', ctx => app.login.initLoginPage(ctx))

page();
