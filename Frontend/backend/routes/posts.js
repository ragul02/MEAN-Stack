const express = require('express');
//Import Mongodb Model
const Post = require('../models/post');

const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const multer = require('multer');
const mime_Type = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = mime_Type[file.mimetype];
        let error = new Error('Invalid MIME type'); //check valid image type
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images')   //  path to store file
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = mime_Type[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
});

/**Save Data */
router.post('',
    checkAuth,
    multer({ storage: storage }).single('image'),
    (req, res, next) => {
        //Using the Post model from mongodb
        const url = req.protocol + '://' + req.get('host');
        console.log('creator', req.userData);
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imagePath: url + '/images/' + req.file.filename,
            creator: req.userData.userId
        });
        console.log('er', req.userData);       
        post.save().then(createdPost => {
            res.status(201).json({
                message: "Post added successfully",
                post: {
                    ...createdPost,
                    id: createdPost._id
                }
            });
        });
    });

// router.post(
//     "",
//     checkAuth,
//     multer({ storage: storage }).single("image"),
//     (req, res, next) => {
//         const url = req.protocol + "://" + req.get("host");
//         const post = new Post({
//             title: req.body.title,
//             content: req.body.content,
//             imagePath: url + "/images/" + req.file.filename,
//             creator:req.userData.usrId
//         });
//         console.log('er', req.userData);
//         post.save().then(createdPost => {
//             res.status(201).json({
//                 message: "Post added successfully",
//                 title: createdPost.title,
//                 content: createdPost.content,
//                 imagePath: createdPost.imagePath,
//                 id: createdPost._id
//             });
//         });
//     }
// );

//update post
router.put("/:id",
    checkAuth, // Check whether token is valid
    multer({ storage: storage }).single("image"),
    (req, res, next) => {
        console.log('erq put', req);
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename;
        }
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData.userId

        });
        console.log('post', post);
        Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
            console.log(result);
            if(result.nModified > 0) {
                res.status(200).json({message: 'Post updated sucessfully!'});
            } else {
                res.status(401).json({message: 'Not Authorized!'});
            }
        }, (err) => {
            console.log('err', err);
        });
    });


//Get All post
router.get("", (req, res, next) => {
    const pageSize = +req.query.pageSize; //convert string to number
    const currentPage = +req.query.currentPage; //convert string to number
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)) //skipping the records
            .limit(pageSize);
    }
    postQuery.find().
        then(documents => {
            fetchedPosts = documents;
            return Post.countDocuments();
        }).then(count => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: fetchedPosts,
                maxPosts: count
            });
        });
});

//Get post by id for updaate
router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        console.log('post', post);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'Post not found!' })
        }
    })
});


//delete post
router.delete("/:id", checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if(result.n > 0) {
        res.status(200).json({ message: 'Post deleted!' })
        } else {
            res.status(401).json({message: 'Not Authorized!'});
      

    })
});
module.exports = router;