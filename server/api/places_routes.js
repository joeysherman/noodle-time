/**
 * Created by Joey on 9/21/2016.
 */

var Router = require('express').Router();

module.exports = (function places(){

  Router.get('/api/near', function(req, res, next){
    req.app.locals.google.places({
      query: 'fast food',
      language: 'en',
      location: [-33.865, 151.038],
      radius: 5000,
      minprice: 1,
      maxprice: 4,
      opennow: true,
      type: 'restaurant'
    }, function(err, places){
      if (!err){
        res.send(places);
      }
    });
  });

  return Router;
})();