require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

const {
    constants,
    statusCodes,
    variables,
} = require('./config');
const {
    ApiError,
    handlers: {
        errorHandler,
        notFoundHandler,
    },
} = require('./errors');
const { connection } = require('./database');
const {
    authRouter,
    postRouter,
    userRouter,
} = require('./routes');

const app = express();

app.use(cors({ origin: configureCors }));
app.use(cookieParser(variables.COOKIE_SECRET_KEY));

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

function configureCors(origin, callback) {
    const whiteList = variables.ALLOWED_ORIGINS.split(';');

    if (!origin && process.env
        .NODE_ENV === constants.DEV_ENVIRONMENT) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(
            new ApiError(
                statusCodes.FORBIDDEN,
                `Origin '${origin}' not allowed by CORS`,
            ),
            false,
        );
    }

    return callback(null, true);
}
