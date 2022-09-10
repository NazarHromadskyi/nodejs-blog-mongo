const { Post } = require('../models');

module.exports = {
    getAll: async (query = {}) => {
        const {
            perPage = 10,
            page = 1,
            sortBy = 'createdAt',
            order = 'desc',
            ...filters
        } = query;

        const orderBy = order === 'asc' ? -1 : 1;
        const filterObject = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'title': {
                    filterObject.title = { $regex: `^${filters.title}`, $options: 'gi' };
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        const posts = await Post
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        return posts;
    },

    getTags: async () => {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(5);

        return posts.map((post) => post.tags).flat().slice(0, 5);
    },

    create: (post) => Post.create(post),

    update: (id, dataToUpdate) => Post.findByIdAndUpdate(id, dataToUpdate, { new: true }),

    delete: (id) => Post.findByIdAndDelete(id),
};
