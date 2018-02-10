// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var lecturerSchema = mongoose.Schema({

    local            : {
        firstname    : String,
        lastname     : String,
        subject      : String,
        modules      : [{type: String}],
        posts        : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
    }
});

lecturerSchema.plugin(timestamps);
module.exports = mongoose.model('Lecturer', lecturerSchema);

