var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var postSchema = mongoose.Schema({
    rating       : Number,
    comment      : String,
    lecturer     : String,
    user         : String
});

postSchema.plugin(timestamps);
module.exports = mongoose.model('Post', postSchema);

