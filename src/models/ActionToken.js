const { Schema, model } = require('mongoose');

const ActionTokenSchema = new Schema({
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

ActionTokenSchema.pre('findOne', function () {
    this.populate('user');
});

module.exports = model('token', ActionTokenSchema);
