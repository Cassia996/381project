var express = require('express');
var router = express.Router();
var { User } = require("../mongoose");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



var bodyParser = require('body-parser');
 
// ... 
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// ... 
// 
//  request from form of the html file
//
router.post("/addUser", jsonParser ,function (request, response,next) {
  let data = {
    userName: request.body.username,
    pwd:request.body.password
  }
  var addUser = new User(data)
  addUser.save();
  response.send(JSON.stringify(data))
})

router.post("/login",jsonParser,async function(request,response,next){
  const user = await User.findOne({
    userName:request.body.username
  })
  if(!user){
    return response.send('user invalid');
  }
  if(user.pwd !== request.body.password){
    return response.send('password error');
  }
  response.cookie("userName", user.userName, {maxAge: 20000, httpOnly: true});
  response.cookie("userId", user._id, {maxAge: 20000, httpOnly: true});
  response.redirect('/index');
})


module.exports = router;
