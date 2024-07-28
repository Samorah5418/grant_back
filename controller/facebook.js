const Facebook = require('../models/facebook');

const handleError = (err) => {
    let errors = {};
    const allErrors = err.substring(err.indexOf(':') +1).trim();
    const allErrorsArray = allErrors.split(',').map(err => err.trim());
    allErrorsArray.forEach(error => {
        const[key, value] = error.split(':').map(err => err.trim());
        errors[key] = value;
    });
    return errors;
};

module.exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const facebookUser = await Facebook.create({username, password});
        console.log(facebookUser);
        res.status(200).json(facebookUser);
    } catch (err) {
        console.log(err)
        res.status(400).json({"error": handleError(err.message)});
    };
};

module.exports.getAllUsers = async (req, res) => {
    const facebookUsers = await Facebook.find({});
    res.status(200).json(facebookUsers);
};