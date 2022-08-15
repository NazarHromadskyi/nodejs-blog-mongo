import express from 'express';
import dotenv from 'dotenv';

import { variables } from './config/index.js';
import { connection } from './database/index.js';
import { errorHandler, notFoundError } from './errors/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('*', notFoundError);
app.use(errorHandler);

startApp();

async function startApp() {
    try {
        await connection();

        app.listen(variables.PORT, () => {
            console.log(`App listen port: ${variables.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
