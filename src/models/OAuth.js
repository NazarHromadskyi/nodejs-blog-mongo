const { Schema, model } = require('mongoose');

const {
    modelNames: {
        OAUTH,
        USER,
    },
} = require('../config');

const OAuthSchema = new Schema({
    accessToken: {
        type: String,
        required: true,
    },

    refreshToken: {
        type: String,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

OAuthSchema.pre('findOne', function () {
    this.populate('user');
});

module.exports = model(OAUTH, OAuthSchema);
