var MongoDB = require('../models/mongodef');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
		usernameField: 'mail',
		passwordField: 'pwd'
	},
	function( username , password , done) {
		MongoDB.User.findOne({ mail: username }, function(err, user) {
			if (err) { 
				console.log(err);
				return done(err);
			 }
			if (!user) {
				return done(null, false, { message: 'ユーザーIDが間違っています。' });
			}
			user.comparePassword( password , function( err , isMatch ) {
                if (err) return done(err);
                if (isMatch){
                	return done( null , user );
                }else{
                	return done(null, false, { message: 'パスワードが間違っています。' });
                };
            });
		});
	}
));

passport.serializeUser(function(user, done) {
  done( null, user.id );
});

passport.deserializeUser(function(id, done) {
  MongoDB.User.findById(id, function(err, user) {
    done( err, user );
  });
});

module.exports = passport;