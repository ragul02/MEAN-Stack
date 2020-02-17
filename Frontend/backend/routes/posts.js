const express = require('express');
//Import Mongodb Model
const Post = require('../models/post');

const router = express.Router();
    /**Save Data */
    router.post('', (req, res, next) => {
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
   router.put("/:id", (req, res, next) => {
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
   router.get("", (req, res, next) => {
       Post.find().then(documents => {
           console.log('docu', documents);
         res.status(200).json({
           message: "Posts fetched successfully!",
           posts: documents
         });
       });
     });
     
     //Get post by id for updaate
     router.get("/:id", (req, res, next) => {
         Post.findById(req.params.id).then(post => {
             console.log('post', post);
             if(post) {
                 res.status(200).json(post)
               } else {
                   res.status(404).json({message: 'Post not found!'})
               }
           })
       });


       //delete post
       router.delete("/:id", (req, res, next) => {
        Post.deleteOne({_id: req.params.id}).then(result => {
           
                res.status(200).json({message: 'Post deleted!'})

          })
      });
       module.exports = router;