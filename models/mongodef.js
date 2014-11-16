var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var credential = require('../credential');
var db       = mongoose.createConnection(credential.mongodb);
var MongoDB = {};

var userSchema = new mongoose.Schema({
    mail : {
    	type : String ,
    	unique: true 
    },
    pwd : String,
    is_seller : Boolean,
});

// create object

userSchema.plugin( uniqueValidator , { message: 'すでに登録されているメールアドレスです' });
MongoDB.User = db.model('User', userSchema);

module.exports = MongoDB;