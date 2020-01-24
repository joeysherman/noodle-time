/**
 * Created by Joey on 10/7/2019.
 */

var Router = require('express').Router();

module.exports = (function directions_routes() {

  Router.get('/api/distance', function(req, res, next) {
    console.log(JSON.stringify(req.query));

    var lat = req.query.lat,
        lng = req.query.lng, 
        location = lat + "|" + lng;

    var destinations = [];

    if (typeof req.query.destlat == 'object' && req.query.destlat.length) {
      console.log('is array');
      req.query.destlat.forEach(function(item, i) {
        destinations.push({
          lat: req.query.destlat[i],
          lng: req.query.destlng[i],
        });
      });
    }
    
    req.app.locals.google.distanceMatrix({
      origins: [{ lat: lat, lng: lng }],
      destinations: destinations,
      units: 'imperial',
    })
    .asPromise()
    .then((response) => {
      res.send(response);
    }, (error) => {
      res.send(error);  
    });
  });

  return Router;

})();