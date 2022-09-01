const { Schema, model } = require('mongoose');

const {
    modelNames: {
        COMMENT,
        POST,
        USER,
    },
} = require('../config');

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
        default: null,
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
