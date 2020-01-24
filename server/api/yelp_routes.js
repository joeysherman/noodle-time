/**
 * Created by Joey on 11/6/2019.
 */

var Router = require('express').Router();

module.exports = (function yelp_routes() {

  Router.get('/api/noodles', function(req, res) {
    var request = req.query;
    var keys = Object.keys(request);
    var index = 0;
    var query = {};

    req.app.locals.yelp.search({
      term: 'ramen',
      latitude: request.lat,
      longitude: request.lng,
      sort: request.sort || 1,
    })
      .then((data) => { res.send(data)})
      .catch((err) => { res.send(err)});
  });

  Router.get('/api/details', function(req, res) {
    var id = req.query.id || null;

    if (!id) return res.error('No business ID supplied');

    req.app.locals.yelp.business(id)
      .then((business) => res.send(business))
      .catch((err) => res.send(err));
  });

  return Router;

})();

