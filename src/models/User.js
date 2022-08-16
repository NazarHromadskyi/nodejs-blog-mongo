const mongoose = require('mongoose');

const { Schema, model } = mongoose;

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
        ref: 'Post',
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.pre('find', function () {
    this.populate('posts', '-__v -user');
});

userSchema.pre('findOne', function () {
    this.populate('posts', '-__v -user');
});

module.exports = model('User', userSchema);
