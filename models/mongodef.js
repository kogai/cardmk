var mongoose = require('mongoose');
var credential = require('../credential');
var db       = mongoose.createConnection(credential.mongodb);

var userSchema = new mongoose.Schema({
    mail : String,
    pwd : String,
    is_seller : Boolean,
});
// create object

var User = db.model('User', userSchema);

module.exports = User;