const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // "_id": new mongoose.Types.ObjectId().toHexString(),
    "username": {
        type: String, 
        required: true, 
        unique: true,
        minlength: 2,
        maxlength: 50,
        validate: function(){
            var usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
            return usernameRegex.test(this.username)
        }
    },
    "firstName": {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 50,
        validate: function(){
            var nameRegex = /^[a-zA-Z\s]*$/;
            return nameRegex.test(this.firstName);
        }   
    },
    "lastName": {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 50,
        validate: function(){
            var nameRegex = /^[a-zA-Z\s]*$/;
            return nameRegex.test(this.lastName);
        }  
    },
    "password": { 
        type: String, 
        required: true
    },
    "created_at": {
        type: Date, 
        default: Date.now
    },
})

const User = mongoose.model("User", UserSchema);
module.exports = User;
