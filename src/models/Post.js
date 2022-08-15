const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    text: {
        type: String,
        required: true,
        trim: true,
    },

    tags: {
        type: Array,
        default: [],
    },

    viewsCount: Number,

    imageUrl: {
        type: String,
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = model('Post', postSchema);
