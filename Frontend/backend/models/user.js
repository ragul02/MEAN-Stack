const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
// schema 
const userSchema = mongoose.Schema({
    // _id: { type: String },
    email: { type: String, required : true, unique: true},
    password: { type: String, required : true}
});

mongoose.plugin(uniqueValidator); // Mongoose uses plugin to validate

// model has two arguments 1st Name of model to use, 2nd Schema it required
module.exports = mongoose.model('User', userSchema);
