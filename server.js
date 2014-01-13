// Generated by CoffeeScript 1.6.2
(function() {
  var http, port, server, ss, url;

  http = require('http');

  ss = require('socketstream');

  global.mongoose = require('mongoose');

  if (process.env.SUBDOMAIN) {
    url = 'mongodb://nodejitsu:381bc3c074ae32c696fe2f2674a60578@alex.mongohq.com:10031/nodejitsudb642965969';
  } else {
    url = 'mongodb://localhost/hipcharts';
  }

  mongoose.connect(url);

  port = 1337;

  url = 'http://localhost:' + port + '/';

  if (process.env.SUBDOMAIN) {
    port = 8080;
    url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
  }

  ss.client.define('main', {
    view: 'app.jade',
    css: ['app.styl'],
    code: ['libs/jquery.min.js', 'libs/underscore.min.js', 'libs/fastclick.js', 'libs/history.js', 'libs/keymaster.js', 'libs/masonry.js', 'app'],
    tmpl: '*'
  });

  ss.http.route('/', function(req, res) {
    return res.serveClient('main');
  });

  ss.client.formatters.add(require('ss-coffee'));

  ss.client.formatters.add(require('ss-jade'));

  ss.client.formatters.add(require('ss-stylus'));

  ss.client.templateEngine.use(require('ss-hogan'));

  if (ss.env === 'production') {
    ss.client.packAssets();
  }

  server = http.Server(ss.http.middleware);

  server.listen(port);

  ss.start(server);

}).call(this);
