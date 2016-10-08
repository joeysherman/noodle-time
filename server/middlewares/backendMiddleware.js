/**
 * Created by Joey on 9/21/2016.
 */

var Router = require('express').Router();
var morgan = require('morgan');
var google = require('@google/maps');

var key = 'AIzaSyBgSwZr52IjbFkMZsvubb1HmrZtc5NcKbQ';
var q = require('q').Promise;

module.exports = function addApiMiddleware(app) {
  var setting = process.env.NODE_ENV !== 'production' ? 'dev' : 'short';

  app.locals.google = google.createClient({
    key: key,
    Promise: q,
  });

  app.use(morgan(setting));

  app.use(require('../api/places_routes'));
  
  app.use(require('../api/direction_routes'));

  app.use(Router);
};