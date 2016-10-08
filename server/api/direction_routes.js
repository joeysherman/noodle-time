/**
 * Created by Joey on 10/7/2016.
 */

var Router = require('express').Router();

module.exports = (function directions_routes() {

  Router.get('/api/distance', function(req, res, next) {
    console.log(JSON.stringify(req.query));

    var lat = req.query.lat,
        lng = req.query.lng, 
        location = lat + "|" + lng;

    var destlat = req.query.destlat,
        destlng = req.query.destlng,
        destination = destlat + "|" + destlng;
    
    req.app.locals.google.distanceMatrix({
      origins: location,
      destinations: destination,
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