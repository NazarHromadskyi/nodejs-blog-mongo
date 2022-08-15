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

    age: Number,

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
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: [],
    }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = model('User', userSchema);
