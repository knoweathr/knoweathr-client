if (window.location.pathname !== '/') {
  page.base('/knoweathr-client')
}


page('/', ctx => app.initIndexPage(ctx));
page('/about', ctx => app.initAboutPage(ctx));
