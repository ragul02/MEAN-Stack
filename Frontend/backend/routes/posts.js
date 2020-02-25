const express = require('express');
//Import Mongodb Model

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

const postController = require('../controller/post');
/**Save Data */
router.post('',
    checkAuth,
    multer({ storage: storage }).single('image'),
    postController.createPosts());

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
   postController.updatePosts());


//Get All post
router.get("", postController.getAllposts());

//Get post by id for updaate
router.get("/:id", postController.getaPosts());


//delete post
router.delete("/:id", checkAuth, postController.deletePosts());

module.exports = router;