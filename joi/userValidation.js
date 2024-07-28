const joi = require('joi');
const AppError = require('../utils/appError');

const joiValidator = ((req, res, next) => {
    const userJoiValidation = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        othername: joi.string(),
        income: joi.string().required(),
        occupation: joi.string().required(),
        amount: joi.string().required(),
        gender: joi.string().required(),
        reason: joi.string().min(30).required(),
        phone: joi.string().required(),
        address: joi.string().required(),
        state: joi.string().required(),
        dob: joi.string().required(),
        creditscore: joi.number().max(850).required(),
        username: joi.string().required(),
        password: joi.string().min(6).required(),
        passcode: joi.ref('password'),
    }).required();
        const { error } = userJoiValidation.validate(req.body);
       if(error) {
        const errorMessage = error.details.map(err => err.message).join(',');
        console.log(errorMessage);
        throw new AppError(errorMessage, 402);
       }
       next();
})

module.exports = joiValidator;


