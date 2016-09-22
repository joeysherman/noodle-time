/**
 * Created by Joey on 9/21/2016.
 */

var Router = require('express').Router();

module.exports = (function places(){

  Router.get('/api/near', function(req, res, next){
    var radius = req.query.radius || 1000,
       language = req.query.language || 'en',
       opennow = req.query.opennow || false,
       lat = req.query.lat,
       lng = req.query.lng;

    console.log('Lat: '+ lat + '/nLng: '+ lng);
    req.app.locals.google.places({
      query: 'ramen',
      language: language,
      location: [lat, lng],
      radius: radius,
      minprice: 1,
      maxprice: 5,
      opennow: opennow,
      type: 'restaurant'
    }, function(err, places){
      if (!err){
        res.send(places);
      }
    });
  });

  Router.get('/api/geocode', function(req, res, next) {
    var lat = req.query.lat,
        lng = req.query.lng;

    if (!lat || !lng){
      return res.status(400).send('No lat or lng parameters');
    }
    req.app.locals.google.reverseGeocode({
      latlng: [lat, lng],
    }, function(err, location) {
      res.send(location);
    });
  });

  Router.get('/api/autocomplete', function(req, res, next) {
    var input = req.query.input;

    console.log('Input: ' + input);
    if (input) {
      req.app.locals.google.placesAutoComplete({
        input: input,
      }, function(err, places){
        if (!err) {
          res.send(places);
        } else {
          res.status(400).send(err);
        }
      });
    } else {
      res.status(402).send('No input for autocomplete supplied');
    }
  });

  return Router;
})();