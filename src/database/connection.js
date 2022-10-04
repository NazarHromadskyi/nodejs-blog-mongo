const chalk = require('chalk');
const mongoose = require('mongoose');

const {
    statusCodes,
    variables: {
        MONGO_CONNECTION,
    },
} = require('../config');
const { ApiError } = require('../errors');

module.exports = {
    connectDb: async () => {
        try {
            await mongoose.connect(`${MONGO_CONNECTION}`);

            console.log(chalk.greenBright('Database connected'));
        } catch (e) {
            throw new ApiError(statusCodes.SERVER_ERROR, e.message);
        }
    },
};
