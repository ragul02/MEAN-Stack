const mongoose = require('mongoose');

// schema - Blueprint 
const postSchema = mongoose.Schema({
    // _id: { type: String },
    title: { type: String, required : true},
    content: { type: String, required : true},
    imagePath: {type: String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} // User is the model
});

// model has two areguments 1st Name of model to use, 2nd Schema it required
module.exports = mongoose.model('Post', postSchema);

//collection(posts) will create in plural form of model  "Post"