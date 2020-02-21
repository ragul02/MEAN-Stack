const express = require('express');
const router = express.Router();

const User = require('../models/user');

const bcrypt = require('bcrypt')

const jsonwebtoken = require('jsonwebtoken');
/**Sign Up */
router.post("/signup", (req, res, next) => {
    console.log('req', req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User Created',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err

                    })
                });
        })

})

/** Login */
router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log('suer', user, req.body);
            if (!user) {
                return res.status(401).json({
                    message: 'User not Found'
                })
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            console.log('suer', result, fetchedUser);

            if (!result) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            const token = jsonwebtoken.sign({ email: fetchedUser.email, id: fetchedUser._id },
                'secret_should_be_long', //second argument should be long string, it validate the hashes
                { expiresIn: '1h' } //third argument optional, expiring time
            );
            res.status(200).json({
                token: token
            });

        })
        .catch(err => {
            return res.status(401).json({
                message: 'Auth failed'
            })
        })
})
module.exports = router;
