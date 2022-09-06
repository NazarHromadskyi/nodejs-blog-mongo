const { Schema, model } = require('mongoose');

const {
    modelNames: {
        COMMENT,
        POST,
        USER,
    },
} = require('../config');

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
        ref: USER,
        required: true,
        default: null,
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: COMMENT,
    }],
}, {
    timestamps: true,
    toObject: { virtuals: true },
});

postSchema.pre('find', function () {
    this.populate('user', '-posts -password -__v -comments');
});

postSchema.pre('findOne', function () {
    this.populate('user', '-posts -password -__v -comments');
    this.populate('comments', '-__v -user -post');
});

module.exports = model(POST, postSchema);
