const express = require('express');
//Import Mongodb Model

const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const postController = require('../controller/post');
/**Save Data */
router.post('', checkAuth, extractFile, postController.createPosts);


//update post
router.put("/:id",
    checkAuth, // Check whether token is valid
    extractFile,
   postController.updatePosts);


//Get All post
router.get("", postController.getAllposts);

//Get post by id for updaate
router.get("/:id", postController.getaPosts);


//delete post
router.delete("/:id", checkAuth, postController.deletePosts);

module.exports = router;