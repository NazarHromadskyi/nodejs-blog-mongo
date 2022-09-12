const { Schema, model } = require('mongoose');

const {
    modelNames: {
        COMMENT,
        POST,
        USER,
    },
} = require('../config');
const passwordService = require('../services/password.service'); // require directly to avoid circular dependency

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    age: {
        type: Number,
        default: null,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        trim: true,
        required: true,
    },

    avatarUrl: {
        type: String,
        trim: true,
        default: null, // todo change to empty string
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: POST,
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: COMMENT,
    }],
}, {
    timestamps: true,
    toObject: { virtuals: true },
    statics: {
        async createUserWithHashPassword(userObject = {}) {
            const hashedPassword = await passwordService.hash(userObject.password);

            return this.create({ ...userObject, password: hashedPassword });
        },
    },
});

userSchema.pre('find', function () {
    this.populate('posts', '-__v -user -comments');
    this.populate('comments', '-__v -user -post');
});

userSchema.pre('findOne', function () {
    this.populate('posts', '-__v -user -comments');
    this.populate('comments', '-__v -user -post');
});

module.exports = model(USER, userSchema);
