/**
 * Created by Joey on 9/21/2016.
 */

var Router = require('express').Router();

module.exports = (function places(){

  Router.get('/api/near', function(req, res, next){
    var radius = req.query.radius || 1000,
       language = req.query.language || 'en',
       opennow = true,
       lat = req.query.lat,
       lng = req.query.lng;
    
    
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

  Router.get('/api/place', function(req, res, next) {
    var id = req.query.id;

    if (!id) return res.status(402).send('No place ID supplied in request');

    req.app.locals.google.place({
      placeid: id,
      language: 'en',
    })
    .asPromise()
    .then((response) => {
      res.send(response);
    }, (error) => {
      res.send(error);
    });

  });

  Router.get('/api/placePhoto', function(req, res, next) {
    var reference = req.query.reference;

    if (!reference) return res.status(402).send('No Photo Reference supplied in request.');

    req.app.locals.google.placesPhoto({
      photoreference: "CoQBdwAAAPVwoTvroc0TxdCFEo4rqNV7VypNHQTzKXt5XRxrHvmA1R3b6HuFcNlofgdOypsQPhtmn5YOOIe_L0OaRn4UelIDJbNzpTvdNOoFS6wmGtE6mnW7pHCfQpVU9ucKUo9vq_PSCikocF7UV4HiG01UHDfA-LAme5iC39Lr4YEWFLNBEhAHKfQcdOjtF_O8cjTFSZCZGhShFHmz-WFzypH74uB5OiQSLroaHw",
      maxwidth: 100,
      maxheight: 100
    })
    .asPromise()
    .then((response) => {
      
    }, (error) => {
      res.send(error);
    });

  });

  return Router;
})();