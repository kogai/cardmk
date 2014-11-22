var express = require('express');
var router = express.Router();
var MongoDB = require('../models/mongodef');
var mailer = require('../models/mailer');
var uuid = require('node-uuid');

router.post('/regist/' , function( req , res ){
    
    var verify_id = uuid.v1();

    var newUser = new MongoDB.User({
        mail : req.body.mail,
        pwd : req.body.pwd,
        uuid : verify_id,
        is_verify : 'UNVERIFIED',
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
    var host = req.get('host');
    var link = "http://" + req.get('host') + "/verify?id=" + verify_id;
    var data = {
        mail : req.body.mail,
        pwd : req.body.pwd,
        link : link
    };
    mailer(data);
});

router.post('/login/' , function(req,res){
    var email    = req.body.mail;
    var password = req.body.pwd;
    var query = { "mail" : email };

    MongoDB.User.findOne( query , function( err , data ){
        if(err) {
            console.log(err);
        }else if( data.length === 0 ){
            // login is err
            res.render('login', {
                title : 'エラー',
                is_visible : 'show',
                caution : '入力した情報が間違っています'
            });
            // res.redirect( 303, '/login');
        }else if( data.is_verify === 'UNVERIFIED'){
            res.render('login', {
                title : 'エラー',
                is_visible : 'show',
                caution : 'メールアドレスが認証されていません。'
            });
        }else{
        
            data.comparePassword( password , function( err , isMatch ) {
                if (err) throw err;
                if (isMatch){                
                    req.session.login = query;
                    res.redirect( 303, '/');
                }else{
                    res.render('login', {
                        title : 'エラー',
                        is_visible : 'show',
                        caution : '入力した情報が間違っています'
                    });
                };
            });
            // login is success
        }
    });
});

router.post('/logout/' , function(req,res){
    delete req.session.login;
    res.redirect( 303, '/login');
});

module.exports = router;