const express = require('express');
const router = express.Router();
const PrivateMessage = require('../model/privateMessage');


// route: POST /api/private-messages
// save messages in mongodb
router.post('/', 
    async (req, res) => {
    try {
        const { from_user, to_user, message, date_sent } = req.body;

        const newPM = new PrivateMessage({
            from_user: from_user,
            to_user: to_user,
            message: message,
            date_sent: date_sent
        });

        await newPM.save(); // persist to db
        // on success
        res.status(201).json({
            message: "Private message created successfully.",
            data: {
                from_user: newPM.from_user,
                to_user: newPM.to_user,
                message: newPM.message
            }
        });
    } catch (err) {
        return res.status(500).send({ 
            message: "Private message creation failed.", 
            status: 'Status 500: internal server error', 
            error: err 
        });
    }
    
});

module.exports = router;