//this block of code works fine.
// var http = require('http')
//
// http.createServer(function(req, res){
//   res.writeHead(200, {"Content-Type": "text/plain"});
//   res.end("Hello!!!");
// }).listen(process.env.PORT||3000)

var express = require('express');
// const hbs = require('hbs');
// var exphbs = require('express-handlebars');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var uristring = process.env.MONGODB_URI || 'mongodb://localhost/ballball';
var statistics = require('./model/account');
mongoose.connect(uristring);
//app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static(__dirname + '/View'));
app.use(bodyParser.json());
app.use(parseUrlEncoded);
//app.use(require('express-session')({secret:'goodhaha'}));
//app.use(passport.initialize());
//app.use(passport.session());
// passport.use(new LocalStrategy({
//   usernameField:'user',
//   passwordField:'password'
//   },function(username, password, done){
//     account.findOne({user:username}, function(err, user){
//       if(err) return done(err);
//       if(!user){
//         console.log('No user found....')
//         return done(null, false, {message:'incorrect name!'});
//     }
//       //list all keys in user(for test purpose)
//       var keys = Object.keys(user._doc);
//       console.log('keys of USER:'+ keys);
//       user.comparePassword(password, user.password, function(err, isMatch){
//         console.log('ismatch:'+isMatch);
//         if(err) return done(err);
//         if(isMatch === false){
//           return done(null, false, {message:'incorrect password...'});
//         }else{
//           return done(null, user, {message:'successfully authenticating user...'});
//         }
//       });
//     });
// }));
// passport.serializeUser(function(user, done){
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done){
//   account.findById(id, function(err, user){
//     done(err, user);
//   });
// });

app.get('/', function(req, res) {
    // console.log('app.get("/") called..');
    // var loghref = (!req.session.user) ? '/login' : '/logout';
    // var logtext = (!req.session.user) ? 'Login' : 'Logout';
    // res.render('index.hbs', { loginorout: logtext, loglink: loghref });
    console.log('connect to root');
    res.sendFile('index.html');

});

app.post('/send', function(req, res) {
    //var newblock = req.body;
    // account.count({user:req.body.email}, function(err, count){
    //   if(err){
    //     console.error(err);
    //   }
    //   if(count>0){
    //     console.log('Account duplicated!');
    //     res.status(201).json('Error : This Email has been registered!');
    //   }else if(count == 0){
    //     var newaccount = new account({
    //       user:req.body.email,
    //       password:req.body.password
    //     });
    //     newaccount.save(function(err, newaccount){
    //       if(err) console.error(err);
    //       console.log('new account has been created!');
    //     })
    //     res.status(201).json('sign up success!');
    //   }else{
    //     res.status(201).json('Bad response...');
    //   }
    // });
    var new_record = new statistics({
        type: req.body.type
    });
    new_record.save(function(err, newrec) {
        if (err) {
            console.error(err);
        } else {
            res.status(201).json('successfully save type info..');
        }
    });
});
// app.get('/record', function(req, res) {
//     if (!req.session.user) {
//         console.log('請先登入喔!');
//         res.redirect('/');
//     } else {
//         console.log('進入記錄畫面....');
//         account.findOne({ user: req.session.user.user }, function(err, user) {
//                 if (err) {
//                     console.error(err);
//                     res.render('record.hbs');
//                 }
//                 if (!user) {
//                     console.log('can\'t find user data....');
//                     res.render('record.hbs');
//                 } else {
//                     console.log('start rendering!');
//                     if (user.eventrecord.length < 1) {
//                         var data = [];
//                         console.log('event data < 0....');
//                         res.render('record.hbs', data);
//                     } else {
//                         console.log('event datat >= 1...');
//                         var data = [];
//                         user.eventrecord.forEach(function(element, index, array) {
//                             var hour = String(Math.floor(parseInt(element.eventtime) / 60));
//                             var min = String(parseInt(element.eventtime) % 60);
//                             data.push({ eventname: element.eventname, eventtime: { hour: hour, min: min } });
//                         })
//                         console.log('show table data....');
//                         console.log(data);
//                         res.render('record.hbs', { recorddata: data });
//                     }
//                 }
//             })
//             // res.render('record.hbs');
//     }
// });
// app.get('/test', function(req, res) {
//     res.send(uristring);
// });
// app.get('/calendar', function(req, res) {
//     res.render('calendar.hbs');
// })
// app.post('/record', function(req, res) {
//     if (!req.session.user) {
//         res.status(401).send('You haven\'t been verified identification.....');
//     }
//     console.log(Object.keys(req.session.user));
//     var name = req.session.user.user;
//     account.findOne({ user: name }, function(err, user) {
//         if (err) console.error(err);
//         if (!user) {
//             console.log('user doesn\'t exist...');
//             res.status(500).send('updating data failed....');
//         } else {
//             var eventobj = user.eventrecord;
//             eventobj.push({ eventname: req.body.event, eventtime: req.body.time });
//             account.findOneAndUpdate({ user: name }, { eventrecord: eventobj }, { upsert: false }, function(err, doc) {
//                 if (err) {
//                     console.error(err);
//                     res.status(500).send('updating data failed...');
//                 }
//                 console.log('update event Array complete!');
//                 res.status(200).send(200);
//             });
//         }
//     });
// });
//curl -X POST http://localhost:3000/login -H "Content-Type:application/json" -d "{\"user\":\"new7@gmail.com\",\"password\":\"123456\"}" -v
//curl GET http://locallhost:3000/record -H "Content-Type:html" -v
// app.get('/login', function(req, res) {
//     if (!req.session.user) {
//         res.render('login.hbs');
//     } else {
//         res.render('index.hbs', { loginorout: 'Logout', loglink: '/logout' });
//     }
// })
// app.get('/logout', function(req, res) {
//     req.logout();
//     //it seems that res.logout doesn't work well, instead we use res.session.destroy()
//     req.session.destroy();
//     res.redirect('/');
// })
// app.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
//     console.log('POST login...');
//     //if user didn't pass identity test, program won't reach here...
//     req.session.user = req.user;
//     if (!req.user) {
//         console.log('login fail!');
//         res.send(0);
//     } else {
//         console.log('login success!');
//         res.redirect('/');
//     }
//     // res.json('user ID:' + req.user.id+', req.session:' + req.session);
// });

app.listen(process.env.PORT || 3000, function() {
    console.log('listening to port....');
});