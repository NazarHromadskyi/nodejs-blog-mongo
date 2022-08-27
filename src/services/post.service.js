const { Post } = require('../models');

module.exports = {
    getAll: () => Post.find().sort({ createdAt: -1 }),

    getTags: async () => {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(5);

        return posts.map((post) => post.tags).flat().slice(0, 5);
    },

    create: (post) => Post.create(post),

    update: (id, dataToUpdate) => Post.findByIdAndUpdate(id, dataToUpdate, { new: true }),

    delete: (id) => Post.findByIdAndDelete(id),
};
