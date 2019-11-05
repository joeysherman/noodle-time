/**
 * Created by Joey on 9/21/2016.
 */

var Router = require('express').Router();
var morgan = require('morgan');
var google = require('@google/maps');
var yelp = require('yelp-fusion');

var google_key = 'AIzaSyBJ6Mz5VhadOlFilIS0L610BUZwcd485uE';

var yelp_key = 'tfaLrmkgPxhzvB0JhOVSz4NabdK1MN_dkJK6ug61RKCohpuimDTL-KZLVa6gjJPauUE7P44kY0EHrDG65lL2c-iEbS--qhRa9v9lwoT4KjUoK-YgjEyGye10cTacW3Yx';

const DEV_MODE   = process.env.NODE_ENV !== 'production';

module.exports = function addApiMiddleware(app) {
  var setting = DEV_MODE ? 'dev' : 'short';

  app.locals.google = google.createClient({
    key: google_key
  });

  app.locals.yelp = yelp.client(yelp_key);

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