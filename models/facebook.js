const mongoose = require('mongoose');
const { Schema } = mongoose;

const facebookSchema = new Schema({
    username: {
        type: String,
        required: [true, 'please enter a valid email address or phone number']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

module.exports = mongoose.model('Facebook', facebookSchema)