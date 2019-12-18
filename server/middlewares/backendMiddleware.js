/**
 * Created by Joey on 9/21/2016.
 */

const Router = require('express').Router();
const google = require('@google/maps');
const yelp = require('yelp-fusion');
const dotEnv = require('dotenv').config();

const { GOOGLE_KEY } = process.env;

const { YELP_KEY } = process.env;

const DEV_MODE = process.env.NODE_ENV !== 'production';

module.exports = function addApiMiddleware(app) {
  const setting = DEV_MODE ? 'dev' : 'short';
  const YELP_ROUTES = require('../api/yelp_routes');
  const LOCATION_ROUTES = require('../api/location_routes');

  if (GOOGLE_KEY === undefined) {
    console.error(
      'Expected environment variable "GOOGLE_KEY" not found..exiting.',
    );
    process.exit(1);
  } else if (YELP_KEY === undefined) {
    console.error(
      'Expected environment variable "YELP_KEY" not found..exiting.',
    );
    process.exit(1);
  }

  app.locals.google = google.createClient({
    key: GOOGLE_KEY,
  });

  app.locals.yelp = yelp.client(YELP_KEY);

  Router.get('/api/*', function(req, res, next) {
    res.set({
      'Access-Control-Allow-Origin': '*',
    });
    next();
  });

  app.use(Router);

  app.use(LOCATION_ROUTES);
  app.use(YELP_ROUTES);
  /* No longer using google API */
  /*  app.use(require('../api/places_routes'));
  
  app.use(require('../api/direction_routes')); */
};
