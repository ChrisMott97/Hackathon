// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var postSchema = mongoose.Schema({
    rating       : Number,
    comment      : String,
    lecturer     : String
});

postSchema.plugin(timestamps);
module.exports = mongoose.model('Post', postSchema);

