//this block of code works fine.
// var http = require('http')
//
// http.createServer(function(req, res){
//   res.writeHead(200, {"Content-Type": "text/plain"});
//   res.end("Hello!!!");
// }).listen(process.env.PORT||3000)

var express = require('express');
var Datastore = require('@google-cloud/datastore');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
var uristring = process.env.MONGODB_URI || 'mongodb://localhost/ballball';
var statistics = require('./model/account');
mongoose.connect(uristring);
app.use(express.static('public'));
app.use(express.static(__dirname + '/View'));
app.use(bodyParser.json());
app.use(parseUrlEncoded);
var projectId = 'education-185212';
const datastore = Datastore({
    projectId: projectId
});

// The kind for the new entity
const kind = 'Task';
// The name/ID for the new entity
const name = 'sampletask1';
// The Cloud Datastore key for the new entity
const taskKey = datastore.key([kind, name]);

// Prepares the new entity
const task = {
    key: taskKey,
    data: {
        description: 'Buy milk update!'
    }
};

// Saves the entity
// const key = datastore.key('Personality');
// const entity = {
//     key: key,
//     data: [{
//             name: 'created',
//             value: new Date().toJSON()
//         },
//         {
//             name: 'description',
//             value: 'hiiiiiii',
//             excludeFromIndexes: true
//         },
//         {
//             name: 'done',
//             value: false
//         }
//     ]
// };

// datastore.save(entity);

// datastore.update(task)
//     .then(() => {
//         // Task updated successfully.
//     });
// datastore.save(task)
//     .then(() => {
//         console.log(`Saved ${task.key.name}: ${task.data.description}`);
//     })
//     .catch((err) => {
//         console.error('ERROR:', err);
//     });
app.get('/', function(req, res) {
    console.log('connect to root');
    res.sendFile('index.html');

});

app.post('/send', function(req, res) {
    // var new_record = new statistics({
    //     type: req.body.type
    // });
    // new_record.save(function(err, newrec) {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         res.status(201).json('successfully save type info..');
    //     }
    // });
    const key = datastore.key('Personality');
    const entity = {
        key: key,
        data: [{
                name: 'sneding_time',
                value: new Date().toJSON()
            },
            {
                name: 'type',
                value: req.body.type,
            },
            {
                name: 'score',
                value: req.body.score
            }
        ]
    };

    datastore.save(entity);

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