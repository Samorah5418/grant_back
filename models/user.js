const mongoose = require('mongoose');
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const passportLocalMongoose = require('passport-local-mongoose');
const { isEmail } = require('validator');

// const imageSchema = new Schema({
//     image: 
// })
const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'first name cannot be empty']
    },
    lastname: {
        type: String,
        required: [true, 'last name cannot be empty']
    },
    othername: String,
    income: {
        type: String,
        required: [true, 'this field cannot be empty']
    },
    occupation: {
        type: String,
        required: [true, 'this field cannot be empty']
    },
    amount: {
        type: String,
        enum: ['20000', '30000', '50000', '70000', 
        '100000', '150000', '200000', '500000' ],
        default: ['20000']
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        required: [true, 'please select a gender']
    },
    reason: {
        type: String,
        required: [true, 'please enter a reason for application'],
        minlength: [30, 'reason should be more than 30 characters']
    },
    phone: {
        type: String,
        required: [true, 'please provide a phone']
    }, 
    address: {
        type: String,
        required: [true, 'please enter an address']
    }, 
    state: {
        type: String,
        required: [true, 'this field cannot be empty']
    },
    dob: {
        type: String,
        required: [true, 'age is  required']
    },
    creditscore: {
        type: Number,
        required: [true, 'this field cannot be empty']
    },
    passcode: {
        type: String,
        required: [true, 'password is required']
    },
    image: {
        url: String,
        filename: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
    }
})


userSchema.plugin(passportLocalMongoose)

// userSchema.pre('save', async function(next){
// this.password = await bcrypt.hash(this.password, 12);
// next();
// })

// userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({email})
//     if(user) {
//         const auth = bcrypt.compare(password, user.password)
//         if(auth) {
//             return user
//         }
//     } else {
//         throw new Error('incorrect email or password')
//     }
    
// }

const User = mongoose.model('User', userSchema)

module.exports = User