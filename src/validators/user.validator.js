const Joi = require('joi');
const {
    constants: {
        EMAIL_REGEXP,
        PASSWORD_REGEXP,
    },
} = require('../config');

const avatarSchema = Joi.string().trim();
const emailSchema = Joi.string().regex(EMAIL_REGEXP).required().trim();
const passwordSchema = Joi.string().regex(PASSWORD_REGEXP).required().trim();

const createUser = Joi.object({
    firstName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),

    lastName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),

    age: Joi
        .number()
        .min(10)
        .max(105),

    email: emailSchema,
    password: passwordSchema,
    avatarUrl: avatarSchema,
});

const updateUser = Joi.object({
    firstName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),

    lastName: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim(),

    email: Joi.string().regex(EMAIL_REGEXP).trim(),
    age: Joi.number().min(10).max(105),
    avatarUrl: avatarSchema,
});

const login = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: emailSchema,
});

const email = Joi.object({
    email: emailSchema,
});

const password = Joi.object({
    password: passwordSchema,
});

module.exports = {
    createUser,
    email,
    login,
    password,
    updateUser,
};
