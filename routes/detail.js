var express = require('express');
var router = express.Router();
var { Restaurant } = require("../mongoose");
const { response } = require('../app');
/* GET home page. */
router.get('/', async function(req, res, next) {
  var _id = req.query.id;
  var detail = await Restaurant.findOne({
        _id
  })  
  res.render('detail', { title: 'Express', detail:detail });
});

router.get('/remove', async function(req, res, next) {
    var _id = req.query.id;
    var detail = await Restaurant.findOne({
        _id
    })
    if(detail.userId === res.cookie.userId){
        var result = await Restaurant.remove({
            _id
        });
        // console.log('result',result);
        res.redirect('/index');
    }
    res.render('detail', { title: 'Express', detail:detail });
});

module.exports = router;
