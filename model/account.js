// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
// var Schema = mongoose.Schema;
// var accountschema = new Schema({
//   user:{
//     type:String,
//     required:true,
//     index:{unique:true}
//   },
//   password:{
//     type:String,
//     required:true
//   },
//   eventrecord:Array
// });
// var SALT_WORK_FACTOR = 10;
// accountschema.pre('save', function(next){
//   var user = this;
//   console.log('This pointer in save:'+ this);
//   //only hashed the password if it' s been modified (or new).
//   if(!user.isModified('password'))
//     return next();
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//     if(err)
//       return next(err);
//     bcrypt.hash(user.password, salt, function(err, hash){
//       if(err)
//         return next(err);
//       console.log('Unmodified password:'+user.password);
//       user.password = hash;
//       console.log('Modified password:'+user.password);
//       next();
//     })
//   })
// });
// accountschema.methods.comparePassword = function(comparedpw, dbpassword, cb){
//   console.log('user input password:'+ comparedpw);
//   console.log('dbpassword:' + dbpassword);
//   bcrypt.compare(comparedpw, dbpassword, function(err, isMatch){
//     // console.log('This pointer in compare:'+ this);

//     if(err) throw err;
//     console.log('result:' + isMatch);
//     cb(null, isMatch);
//   })
// };

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var statistic_schema = new Schema({
    type: Number
});

module.exports = mongoose.model('Statistics', statistic_schema);