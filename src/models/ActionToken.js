const { Schema, model } = require('mongoose');

const {
    modelNames: {
        ACTION_TOKEN,
        USER,
    },
} = require('../config');

const ActionTokenSchema = new Schema({
    token: {
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

ActionTokenSchema.pre('findOne', function () {
    this.populate('user');
});

module.exports = model(ACTION_TOKEN, ActionTokenSchema);
