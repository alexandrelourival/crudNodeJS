import express from 'express'

import { config } from 'dotenv'
import { MongoClient } from './database/mongo';

import healthRouter from './routes/healthRoutes';
import companiesRouter from './routes/companiesRoutes';
import usersRouter from './routes/usersRoutes';
import unitsRouter from './routes/unitsRoutes';
import assetsRouter from './routes/assetsRoutes';


const main = async () => {

    config();

    const app = express();

    const port = process.env.PORT || 8080;

    app.use(express.json());

    await MongoClient.connect();

    app.use(healthRouter);
    app.use(companiesRouter);
    app.use(usersRouter);
    app.use(unitsRouter);
    app.use(assetsRouter);


    app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();