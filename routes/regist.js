var express = require('express');
var router = express.Router();
var User = require('../models/mongodef');

/* GET home page. */
router.get('/', function(req, res) {
    // define data
    var newUser = new User({
        mail : 'akari@gmail.com',
        pwd : 'akari',
        is_seller : false,
    });

    // save to mongodb
    newUser.save();

    res.render('regist', {
        title: '保存完了'
    });
});

module.exports = router;