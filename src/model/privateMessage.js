const mongoose = require('mongoose');

const PrivateMessageSchema = new mongoose.Schema({
    // "_id": new mongoose.Types.ObjectId().toHexString(),
    "from_user": {
        type: String, 
        required: true
    },
    "to_user": {
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

const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessageSchema);
module.exports = PrivateMessage;
