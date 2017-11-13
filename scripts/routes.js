if (window.location.pathname !== '/') {
  page.base('/knoweathr-client')
}


page('/', ctx => app.mapView.initIndexPage(ctx));
page('/about', ctx => app.mapView.initAboutPage(ctx));

page();
