var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	if(req.session.login){
		res.redirect( 303 , '/' );
	}
	res.render('login' , {
		title : 'ログイン',
		is_visible : 'hidden'
	});
});

module.exports = router;
