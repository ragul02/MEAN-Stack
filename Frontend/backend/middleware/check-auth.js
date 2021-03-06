/**Middle ware */
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'secret_should_be_long'); // second argument  from user.js
       console.log('decode token', decodedToken);
       req.userData = { email: decodedToken.email, userId: decodedToken.id}
        next();
    } catch (error) {
        res.status(401).json({ message: 'You are not Authenticated' });
    }
}