/**express App */
const express = require('express');
const bodyParser = require("body-parser");

//import mongoose to connect with cluster
const mongoose = require("mongoose");

//Import Mongodb Model
const Post = require('./models/post');

//mongodb+srv://user:password@cluster0-0tack.mongodb.net/databasename?retryWrites=true&w=majority'
const db =   mongoose.connect('mongodb+srv://ragul:Q494xuBmLDhqQrhN@cluster0-0tack.mongodb.net/node-angular?retryWrites=true&w=majority',
   {   useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    })
.then(() => {
    console.log('Database connected succesfuuly!');
}).catch( (error) => {
    console.log('Database connection Failed!', error);

});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
          );
          res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, OPTIONS"
          );        next();
    });

    /**Save Data */
app.post('/api/posts', (req, res, next) => {
    //Using the Post model from mongodb
const post = new Post({
    title: req.body.title,
    content: req.body.content
});
post.save().then( createdPost =>{
    res.status(201).json({
        message: 'Post added Succesfully!',
        postId: createdPost._id
    })
});  // mongo db function to save data
});


/**Get Data */
app.get('/api/posts', (req, res, next) => {
Post.find().then( documents =>{
console.log('doc', documents);
res.status(200).json({
    message: 'Post recieved successfully!',
    posts: documents
})
});
});


/**Delete Data */
app.delete("/api/posts/:id", (req, res, next) =>{
    Post.deleteOne({_id: req.params.id}).then( result =>{
        res.status(200).json({
            message: 'Post deleted succesfully!'
        });
    });
});

// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// });

// app.use((req, res, next) => {
//     res.send('Hi, This is from express!');
// });

module.exports = app;