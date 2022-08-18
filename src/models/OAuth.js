const { Schema, model } = require('mongoose');

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
        ref: 'User',
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

OAuthSchema.pre('findOne', function () {
    this.populate('user');
});

module.exports = model('OAuth', OAuthSchema);
