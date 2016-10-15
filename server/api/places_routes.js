/**
 * Created by Joey on 9/21/2016.
 */

var Router = require('express').Router();

module.exports = (function places(){

  /*
   *  Ramen places API route
   *
   *  @param : req.query.lat - latitude of user
   *  @param : req.query.lng - longitude of user
   *  @param (optional) : req.query.radius - radius around location to search.
   *  @default : 1000 meters
   *
   *  @param : req.query.open - search whether place is open now or closed?
   *  @default : true
   *
   *  @param : req.query.language - language to return response in.
   *  @default : en = english
   *
   *  @return : noodle places near the lat & lng in radius meters.
   *
   *  */

  Router.get('/api/places', function(req, res, next){
    console.log(JSON.stringify(req.query));
    var radius = req.query.radius || 1000,
       language = req.query.language || 'en',
       opennow = req.query.open ?
         req.query.open == 'false' ? false : true :
         true,
       lat = req.query.lat,
       lng = req.query.lng;
    
    console.log(opennow);
    req.app.locals.google.places({
      query: 'ramen',
      language: 'en',
      location: [lat, lng],
      radius: 5000,
      minprice: 1,
      maxprice: 4,
      opennow: false,
    }, function(err, places){
      if (!err){
        res.send(places);
      }
    });
  });


  /*
  *  Geocode API route
  *
  *  @param : req.query.lat - latitude of user
  *  @param : req.query.lng - longitude of user
  *
  *  @return : location response using google API
  *
  *  */

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

  /*
   *  AutoComplete API route
   *
   *  @param : req.query.input - input to get predictions on.
   *
   *  @return : array on location predictions based on input
   *
   *  */

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
      res.status(400).send('No input for autocomplete supplied');
    }
  });

  /*
   *  Places Details API route
   *
   *  @param : req.query.id - place id of the requested place
   *
   *  @return : details on a specific place from the google API based
   *   on place ID.
   *
   *  */

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

  //Todo: figure out how to forward pictues in node.js
/*
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

  });*/

  return Router;
})();