/**Middle ware */
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret_should_be_long'); // second argument  from user.js
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not Authenticated' });
    }
}