/**
 * Created by Joey on 11/6/2016.
 */

var Router = require('express').Router();


module.exports = (function location_routes() {


  /*
   *  Geocode API route
   *
   *  @param : req.query.lat - latitude of user
   *  @param : req.query.lng - longitude of user
   *
   *  @return : location response using google API
   *
   *  */

  Router.get('/api/geocode', function (req, res, next) {
    var lat = req.query.lat,
        lng = req.query.lng;

    if (!lat || !lng) {
      return res.status(400).send('No lat or lng parameters');
    }
    req.app.locals.google.reverseGeocode({
      latlng: [lat, lng],
    }, function (err, location) {
      res.send(location);
    });
  });

  /*
   *  AutoComplete API route
   *
   *  @param : req.query.input - input to get predictions on.
   *
   *  @return : array on location predictions based on input
   *
   *  */

  Router.get('/api/autocomplete', function (req, res, next) {
    var input = req.query.input;

    console.log('Input: ' + input);
    if (input) {
      req.app.locals.google.placesAutoComplete({
        input: input,
      }, function (err, places) {
        if (!err) {
          res.send(places);
        } else {
          res.status(400).send(err);
        }
      });
    } else {
      res.status(400).send('No input for autocomplete supplied');
    }
  });

  return Router;

})();