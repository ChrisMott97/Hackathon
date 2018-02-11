// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var postSchema = mongoose.Schema({
    rating       : Number,
    comment      : String,
    lecturer     : {type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer'}
});

postSchema.plugin(timestamps);
module.exports = mongoose.model('Post', postSchema);

