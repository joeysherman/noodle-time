/**
 * Created by Joey on 9/21/2016.
 */

var Router = require('express').Router();
var morgan = require('morgan');
var google = require('@google/maps');
var yelp = require('yelp');

var google_key = 'AIzaSyBgSwZr52IjbFkMZsvubb1HmrZtc5NcKbQ';

var consumer_key = 'BjwzfCo-0punSOMGe9DY7g';
var consumer_secret = 'MOJhoX2vKG-e3WUeKIxZRBjJ-ME';
var token = 'xNF-zZ6wvkTAJumh6mjKsHUsJ_ifQ_Lo';
var token_secret = 'l11-u6Vov1tXg0Wahq5xr9u8r28';

var q          = require('q').Promise;
const DEV_MODE   = process.env.NODE_ENV !== 'production';

module.exports = function addApiMiddleware(app) {
  var setting = DEV_MODE ? 'dev' : 'short';

  app.locals.google = google.createClient({
    key: google_key,
    Promise: q,
  });

  app.locals.yelp = new yelp({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    token: token,
    token_secret: token_secret,
  });

  Router.get('/api/*', function(req, res, next){
    res.set({
      'Access-Control-Allow-Origin' : '*',
    });
    next();
  });

  app.use(morgan(setting));

  app.use(Router);

  app.use(require('../api/location_routes'));
  app.use(require('../api/yelp_routes'));
  /* No longer using google API*/
/*  app.use(require('../api/places_routes'));
  
  app.use(require('../api/direction_routes'));*/

};