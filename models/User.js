//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Users', UserSchema );