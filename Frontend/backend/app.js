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
app.use(bodyParser.urlencoded({extended: false}));
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', "Origin, Content-Type, X-Requested-With, Accept");
        res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS")
    
        next();
    });

app.post('/api/posts', (req, res, next) => {
    //Using the Post model from mongodb
const post = new Post({
    title: req.body.title,
    content: req.body.content
});
post.save();  // mongo db function to save data
console.log('post', post);
res.status(201).json({
    message: 'Post added Succesfully!'
})
});

app.get('/api/posts', (req, res, next) => {
    const posts = [{
            id: '2adakmkjs34ds',
            title: 'First title',
            content: 'First content from server'
        },
        {
            id: '4djgimkjs57kkfd',
            title: 'Second title',
            content: 'First content from server'
        }
    ]
    res.status(200).json({
        message: 'Post recieved successfully!',
        posts: posts
    })
});

// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// });

// app.use((req, res, next) => {
//     res.send('Hi, This is from express!');
// });

module.exports = app;