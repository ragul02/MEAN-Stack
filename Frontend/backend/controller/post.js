const Post = require('../models/post');

exports.createPosts = (req, res, next) => {
    console.log('req', req);
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
    })
        .catch(error => res.status(500).json({
            message: 'Creating Post failed'
        }));
}

exports.updatePosts =  (req, res, next) => {
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
        if (result.nModified > 0) {
            res.status(200).json({ message: 'Post updated sucessfully!' });
        } else {
            res.status(401).json({ message: 'Not Authorized!' });
        }
    }, (err) => {
        console.log('err', err);
    })
    .catch(error => res.status(500).json({
        message: 'Updating Post failed'
    }));
}

exports.getAllposts = (req, res, next) => {
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
        })
        .catch (error => res.status(500).json({
            message: 'Fetching Post failed'
        }));
}

exports.getaPosts = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        console.log('post', post);
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'Post not found!' })
        }
    })
    .catch(  error => res.status(500).json({
        message: 'Fetching Post failed'
    }));
}

exports.deletePosts = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: 'Post deleted!' })
        } else {
            res.status(401).json({ message: 'Not Authorized!' });

        }
    })
    .catch(  error => res.status(500).json({
        message: 'Fetching Post failed'
    }));
}