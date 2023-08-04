import express from 'express'
import { config } from 'dotenv'
import { GetCompaniesController } from './controllers/company/getCompany';
import { MongoGetCompaniesRepository } from './repositories/company/mongoGetCompany';
import { HttpResponse } from './controllers/protocols';
import { Company } from './models/company';
import { MongoClient } from './database/mongo';


const main = async () => {

    config();

    const app = express();

    await MongoClient.connect();

    const port = process.env.PORT || 8080;


    app.get('/health', (request, response) => {
        const datetime = new Date().toLocaleString('pt-BR');
        const body = {
            status: 'Server is up and running!',
            datetime
        }

        response.status(200).send(body);
    });

    app.get('/companies', async (request, response) => {
        const mongoGetCompaniesRepository: MongoGetCompaniesRepository = new MongoGetCompaniesRepository();
        const getCompaniesController: GetCompaniesController = new GetCompaniesController(mongoGetCompaniesRepository);

        const { statusCode, body }: HttpResponse<Company[]> = await getCompaniesController.handle();

        return response.status(statusCode).send(body);
    });

    app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();