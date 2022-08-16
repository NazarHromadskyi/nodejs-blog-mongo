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

    viewsCount: {
        type: Number,
        default: 0,
    },

    imageUrl: {
        type: String,
        default: null,
        trim: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

postSchema.pre('find', function () {
    this.populate('user', '-posts -password -__v');
});

postSchema.pre('findOne', function () {
    this.populate('user', '-posts -password -__v');
});

module.exports = model('Post', postSchema);
