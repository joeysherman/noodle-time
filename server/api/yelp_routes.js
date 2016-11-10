/**
 * Created by Joey on 11/6/2016.
 */

var yelp = require('yelp');

var Router = require('express').Router();

module.exports = (function yelp_routes() {

  Router.get('/api/noodles', function(req, res) {
    var request = req.query;
    var keys = Object.keys(request);
    var index = 0;
    var query = {};

    for (index; index<keys.length; index++) {
      switch (keys[index]) {
        case 'limit' :
          query.limit = request.limit;
          break;
        case 'sort' :
          query.sort = request.sort;
          break;
      }
    }

    query.cll = request.lat + ',' + request.lng;
    console.log(query.cll);
    query.term = 'ramen';

    req.app.locals.yelp.search({
      term: 'ramen',
      ll: request.lat + ',' + request.lng,
      sort: request.sort || 1,
    })
      .then((data) => { res.send(data)})
      .catch((err) => { res.send(err)});
  });

  Router.get('/noodle', function(req, res) {
    var id = req.query.id || null;

    if (!id) return res.error('No business ID supplied');

    req.app.locals.yelp.business(id)
      .then((business) => res.send(business))
      .catch((err) => res.error(err));
  });

  return Router;

})();

