const express = require('express');
const router = express.Router();
const userController = require('../controller/user')

/**Sign Up */
router.post("/signup", userController.createUser());

/** Login */
router.post('/login',userController.loginUser());
module.exports = router;
