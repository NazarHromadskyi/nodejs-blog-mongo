const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
    token: {
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

tokenSchema.pre('findOne', function () {
    this.populate('user');
});

module.exports = model('token', tokenSchema);
