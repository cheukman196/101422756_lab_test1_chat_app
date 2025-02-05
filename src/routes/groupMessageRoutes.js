const express = require('express');
const router = express.Router();
const GroupMessage = require('../model/groupMessage');


// route: POST /api/group-messages
// save messages in mongodb
router.post('/', 
    async (req, res) => {
    try {
        const { from_user, room, message, date_sent } = req.body;

        const newGM = new GroupMessage({
            from_user: from_user,
            room: room,
            message: message,
            date_sent: date_sent
        });
        
        await newGM.save(); // persist to db
        // on success
        res.status(201).json({
            message: "Private message created successfully.",
            data: {
                from_user: newGM.from_user,
                room: newGM.room,
                message: newGM.message,
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