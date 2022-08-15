import mongoose from 'mongoose';

import { variables } from '../config/index.js';

const { DATABASE_NAME, MONGO_CONNECTION } = variables;

async function connection() {
    try {
        await mongoose.connect(`${MONGO_CONNECTION}${DATABASE_NAME}`);
        console.log('Database connected');
    } catch (e) {
        console.log(e);
    }
}

export { connection };
