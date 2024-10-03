const Joi = require('joi');

const userSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    email: Joi.string(),
    bio: Joi.string(),
    password: Joi.string().min(4),
    repeat_password: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': 'Repeat password must match password',
        'any.required': 'Repeat password is required'
    })
}).min(1)

module.exports = userSchema;
