var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var mongoose = require('mongoose');

var app = express();

var credential = require('./credential');
var db       = mongoose.createConnection(credential.mongodb);
var mouseSchema = new mongoose.Schema({
    name        : String,
    age         : Number,
    is_pockemon : Boolean,  
});
// create object
var Mouse = db.model('Mouse', mouseSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

app.get('/save',function(request,response){

    // define data
    var tom = new Mouse({
        name       : 'Tom',
        age        : 72,
        is_pockemon: false,
    });
    var mickey = new Mouse({
        name       : 'Mickey',
        age        : 84,
        is_pockemon: false,
    });
    var picachu = new Mouse({
        name       : 'ぴかちゅー',
        age        : 16,
        is_pockemon: true,
    });

    // save to mongodb
    tom.save();
    mickey.save();
    picachu.save();

    response.send({'message' : '保存したよん'});
});

app.get('/find',function(request,response){
    // find from mongodb
    Mouse.find(function(err, mice){
        if(err) console.log(err);
        response.send(mice);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;