const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
    // "_id": new mongoose.Types.ObjectId().toHexString(),
    "from_user": {
        type: String, 
        required: true
    },
    "room": {
        type: String, 
        required: true,
    },
    "message": {
        type: String, 
        required: true,
    },
    "date_sent": {
        type: Date, 
        default: Date.now
    },
})

const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessage;
