var mongoose = require('mongoose') // mongoose
var url = "mongodb://localhost:27017/mytest"; // dataSource
mongoose.connect(url);
// add connect()
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successful connection to "+url)
});

var Schema = mongoose.Schema //schema

let user = {
  userName:String,
  pwd:String
}

var userSchema = Schema(user)
var User = mongoose.model('User', userSchema); 
let restaurant = {
  name:String,
  screet:String,
  zipcode:String,
  photo:String,
  userId:String,
}

var restaurantSchema = Schema(restaurant);

var Restaurant = mongoose.model('Restaurant',restaurantSchema);

/*
  mongoose.js: 导出模块
 */
module.exports = {mongoose, User, Restaurant}

/*
  express.js: 引入 mongoose
 */