const { Schema, model } = require('mongoose');

const {
    modelNames: {
        COMMENT,
        POST,
        USER,
    },
} = require('../config');

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: USER,
        required: true,
        default: null,
    },

    post: {
        type: Schema.Types.ObjectId,
        ref: POST,
        required: true,
        default: null,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
});

commentSchema.pre('find', function () {
    this.populate('user', '-posts -password -__v -comments');
});

module.exports = model(COMMENT, commentSchema);
