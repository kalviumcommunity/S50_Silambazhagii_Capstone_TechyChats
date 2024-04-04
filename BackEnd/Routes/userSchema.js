const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    bio: Joi.string().required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Repeat password must match password',
        'any.required': 'Repeat password is required'
    })
});

module.exports = userSchema;
