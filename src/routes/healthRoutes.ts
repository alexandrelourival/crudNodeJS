import express, { Router } from 'express';

const healthRouter: Router = express.Router();

healthRouter.get('/health', (request, response) => {
    const datetime = new Date().toLocaleString('pt-BR');
    const body = {
        status: 'Server is up and running!',
        datetime
    };

    response.status(200).send(body);
});

export default healthRouter;
