var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multiparty = require('multiparty');

var { Restaurant } = require("../mongoose");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.post('/', urlencodedParser, function(req, res, next) {
  var form = new multiparty.Form();
  form.uploadDir = './public/upload';   //upload files
  form.parse(req, function (err, fields, files) {
    var data = {
      name : fields.name[0],
      screet : fields.screet[0],
      zipcode : fields.zipcode[0],
      photo : files.photo[0].path,
      userId: req.cookies.userId 
    }
    var addRestaurant = new Restaurant(data);
    addRestaurant.save();
    res.send("<script>alert('insert success！！！');location.href='/index'</script>");
  }) 
  // res.render('create', { title: 'Express' });
});

module.exports = router;
