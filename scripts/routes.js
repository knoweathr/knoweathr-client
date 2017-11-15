if (window.location.pathname !== '/') {
  console.log('gh paged detected')
  page.base('/knoweathr-client')
  page('/knoweathr-client/', ctx => app.mapView.initIndexPage(ctx));
  page('/knoweathr-client/about', ctx => app.mapView.initAboutPage(ctx));
}

if(window.location.pathname !== '/knoweathr-client') {
  page('/', ctx => app.mapView.initIndexPage(ctx));
  page('/about', ctx => app.mapView.initAboutPage(ctx));
}

page();
