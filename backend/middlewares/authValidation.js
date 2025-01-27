const Joi = require('joi');

const signupValidation = (req, res, next) => {

    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password')) // Ensure confirmPassword matches password
            .required()
            .messages({ 'any.only': 'Passwords must match' }), // Custom error message
    });

    const { error } = schema.validate(req.body, { abortEarly: false }); // Validate all fields
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            errors: error.details.map((err) => err.message) // Send detailed errors
        });
    }
    next();
}

const loginValidation = (req, res, next) => {

    const schema = Joi.object({

        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error })
    }

    next();
}

const forgotPasswordValidation = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password')) // Ensure confirmPassword matches password
            .required()
            .messages({ 'any.only': 'Passwords must match' }), // Custom error message

    });

    const { error } = schema.validate(req.body, { abortEarly: false }); // Validate all fields
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            errors: error.details.map((err) => err.message) // Send detailed errors
        });
    }
   
    next();
}



module.exports = {
    signupValidation,
    loginValidation,
    forgotPasswordValidation
}