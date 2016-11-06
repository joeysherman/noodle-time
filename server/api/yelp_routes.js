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

    for (i; i<keys.length; i++) {
      switch (keys[i]) {
        case 'limit' :
          query.limit = request.limit;
      }
    }

    req.app.locals.yelp.search({
      term: 'ramen',
      ll: '',
      limit: 10,
      sort: 1,
    })
      .then((data) => { res.send(data)})
      .catch((err) => { res.send(err)});
  });

/*  Router.get('/noodle', function(req, res) {
    req.app.locals.yelp.business()
  })*/

  return Router;

})();

