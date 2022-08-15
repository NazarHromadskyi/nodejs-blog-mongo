const mongoose = require('mongoose');

const {
    variables: {
        DATABASE_NAME, MONGO_CONNECTION,
    },
} = require('../config');

module.exports = {
    connectDb: async () => {
        try {
            await mongoose.connect(`${MONGO_CONNECTION}${DATABASE_NAME}`);
            console.log('Database connected');
        } catch (e) {
            console.log(e);
        }
    },
};
