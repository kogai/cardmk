var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    // define data

    res.render('regist', {
        title: '新規登録'
    });
});

module.exports = router;