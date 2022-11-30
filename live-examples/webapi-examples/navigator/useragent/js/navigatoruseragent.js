function findUserAgent() {
  const userAgent = window.navigator.userAgent;
  document.write(
    "<p>Your user agent is: " + "<code>" + userAgent + "</code>" + "</p>"
  );
}
