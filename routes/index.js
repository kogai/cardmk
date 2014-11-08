var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.send({
		'田井中' : '律'
	})
	// res.render('index', {
	// 	title: 'ホーム'
	// });
});

module.exports = router;