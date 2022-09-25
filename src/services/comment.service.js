const { Comment } = require('../models');

module.exports = {
    getAllForPost: (postId) => Comment.find({ post: postId }),

    getLatest: () => Comment.find().sort({ createdAt: -1 }).limit(5),

    create: (data) => Comment.create(data),

    update: (id, data) => Comment.findByIdAndUpdate(id, data),

    delete: (filter = {}) => Comment.deleteMany(filter),
};
