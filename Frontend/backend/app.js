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
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
          );        next();
    });

    /**Save Data */
app.post('/api/posts', (req, res, next) => {
     //Using the Post model from mongodb
const post = new Post({
    title: req.body.title,
    content: req.body.content
});
post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

//update post
app.put("/api/posts/:id", (req, res, next) => {
const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
});
    Post.updateOne({_id: req.params.id}, post).then( result => {
console.log(result);
res.status(200).json({message: 'Post updated sucessfully!',
})
    }, (err) => {
        console.log('err', err);
    });
});


//Get All post
app.get("/api/posts", (req, res, next) => {
    Post.find().then(documents => {
        console.log('docu', documents);
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });
  });
  
  //Get post by id for updaate
  app.get("/api/posts/:id", (req, res, next) => {
      Post.findById(req.params.id).then(post => {
          console.log('post', post);
          if(post) {
              res.status(200).json(post)
            } else {
                res.status(404).json({message: 'Post not found!'})
            }
        })
    });
    module.exports = app;
