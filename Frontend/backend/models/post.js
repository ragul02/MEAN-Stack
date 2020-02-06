const mongoose = require('mongoose');

// schema - Blueprint 
const postSchema = mongoose.Schema({
    title: { type: String, required : true},
    content: { type: String, required : true},
});

// model has two areguments 1st Name of model to use, 2nd Schema it required
module.exports = mongoose.model('Post', postSchema);