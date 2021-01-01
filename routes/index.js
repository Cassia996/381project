var express = require('express');
var router = express.Router();
var { Restaurant } = require("../mongoose");
/* GET home page. */
router.get('/', async function(req, res, next) {
  var restaurants = await Restaurant.find();
  res.render('index', { 
    title: 'Restaurants',
    restaurants
 });
});

module.exports = router;
