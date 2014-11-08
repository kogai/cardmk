var express = require('express');
var router = express.Router();
var User = require('../models/mongodef');

router.post('/regist/' , function( req , res ){
    var newUser = new User({
        mail : req.body.mail,
        pwd : req.body.pwd,
        is_seller : false,
    });
    // save to mongodb
    newUser.save(function(err){
        if(err){
            res.render( 'regist', {
                title : 'エラー',
                is_visible : 'show',
                caution : err.errors.mail.message
            });
        }else{
            console.log('regist is success');
            res.redirect( 303, '/login');
        }
    });
});

router.post('/login/' , function(req,res){
    var email    = req.body.mail;
    var password = req.body.pwd;
    var query = { "mail" : email , "pwd": password };
    User.find( query , function( err , data ){
        if(err) {
            console.log(err);
        }else if( data.length === 0 ){
            // login is err
            res.render('login', {
                title : 'エラー',
                is_visible : 'show',
                caution : '入力した情報が間違っています'
            });
        }else{
            // login is success
            res.redirect( 303, '/');
        }
    });
});

module.exports = router;