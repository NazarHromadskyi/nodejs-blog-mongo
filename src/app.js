require('dotenv').config();

const express = require('express');

const {
    handlers: {
        errorHandler,
        notFoundHandler,
    },
} = require('./errors');
const { variables } = require('./config');
const { connection } = require('./database');
const {
    authRouter,
    postRouter,
    userRouter,
} = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

startApp();

async function startApp() {
    try {
        await connection.connectDb();

        app.listen(variables.PORT, () => {
            console.log(`App listen port: ${variables.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
