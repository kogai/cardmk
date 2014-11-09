var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if(!req.session.login){
		res.redirect( 303 , '/regist' );
	}
	res.render('index', {
		title: 'ホーム'
	});
});

module.exports = router;