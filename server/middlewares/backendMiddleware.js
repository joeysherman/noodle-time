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

  Router.get('/api/*', function(req, res, next){
    res.set({
      'Access-Control-Allow-Origin' : '*',
    });
    next();
  });

  app.use(morgan(setting));

  app.use(Router);

  app.use(require('../api/places_routes'));
  
  app.use(require('../api/direction_routes'));

};