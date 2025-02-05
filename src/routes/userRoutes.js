const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/user.js');


// route: POST /api/users/signup
// create user 
router.post('/signup', 
    async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body;

        // hash password
        const saltRounds = 10; // defines computational cost, default 10
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: passwordHash
        });
        await newUser.save(); // persist to db

        // on success
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            _id: newUser._id,
            username: newUser.username,
        });
    } catch (err) {
        let msg = "Signup failed"
        if ('errors' in err) {
            msg += ':';
            for (let error in err.errors) {
                msg += ` ${err.errors[error].message}`;
            }
        } else if (err.code === 11000) {
            // Duplicate username already exists
            msg += ': Username already exists';
        }

        return res.status(500).send({ 
            success: false,
            message: msg, 
            error: err 
        });
    }
    
});

// route: POST /api/users/login
// authenticate login by username
router.post('/login', 
    async (req, res) => {
    try {

        const {username, password} = req.body;

        const user = await User.findOne(
            { username: username }
        );

        if(!user)
            return res.status(404).send({status: false, message: "User cannot be found."})

        const result = await bcrypt.compare(password, user.password); // check pw
        if (!result)
            return res.status(401).send({message: "Authentication unsuccessful.", success: false, }); 

        return res.status(200).json({ message: "Authentication successful", success: true, username: user.username }); 
   

    } catch (err) {
        return res.status(500).send({ message: '500: internal server error', success: false, error: err });
    }

})

// route: POST /api/v1/user/logout
// logout user by deleteing 'token' cookie
router.post('/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true, secure: true})
    res.status(200).send({ message: "User logged out successfully."})

})

module.exports = router;