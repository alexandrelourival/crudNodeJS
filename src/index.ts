import express from 'express'
import { config } from 'dotenv'
import { GetCompaniesController, GetCompanyController, GetUsersCompanyController } from './controllers/company/getControllers';
import { MongoGetCompaniesRepository, MongoGetCompanyRepository, MongoGetUsersCompanyRepository } from './repositories/company/mongoGetCompany';
import { MongoPostCompanyRepository, MongoPostUserCompanyRepository } from './repositories/company/mongoPostCompany';
import { HttpResponse } from './controllers/protocols';
import { ICompany } from './models/company';
import { IUser } from './models/user';
import { MongoClient } from './database/mongo';
import { PostCompanyController, PostUserCompanyController } from './controllers/company/postControllers';


const main = async () => {

    config();

    const app = express();

    app.use(express.json());

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

        const { statusCode, body }: HttpResponse<ICompany[]> = await getCompaniesController.handle();

        return response.status(statusCode).send(body);
    });

    app.post('/companies', async (request, response) => {

        const mongoPostCompanyRepository: MongoPostCompanyRepository = new MongoPostCompanyRepository();
        const postCompanyController: PostCompanyController = new PostCompanyController(mongoPostCompanyRepository);

        const { statusCode, body }: HttpResponse<ICompany> = await postCompanyController.handle({ body: request.body });

        return response.status(statusCode).send(body);
    });

    app.get('/company/:id', async (request, response) => {

        const id = request.params.id;

        const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
        const getCompanyController: GetCompanyController = new GetCompanyController(mongoGetCompanyRepository);

        const { statusCode, body }: HttpResponse<ICompany> = await getCompanyController.handle(id);

        return response.status(statusCode).send(body);
    });

    app.get('/users/:id', async (request, response) => {
        const idCompany = request.params.id;

        const mongoGetUsersCompanyRepository: MongoGetUsersCompanyRepository = new MongoGetUsersCompanyRepository();
        const getUsersCompanyController: GetUsersCompanyController = new GetUsersCompanyController(mongoGetUsersCompanyRepository);

        const { statusCode, body }: HttpResponse<IUser[]> = await getUsersCompanyController.handle(idCompany);


        return response.status(statusCode).send(body);
    });

    app.post('/user/:id', async (request, response) => {
        const idCompany = request.params.id;

        const mongoPostUserCompanyRepository: MongoPostUserCompanyRepository = new MongoPostUserCompanyRepository();
        const postCompaniesController: PostUserCompanyController = new PostUserCompanyController(mongoPostUserCompanyRepository);

        const { statusCode, body }: HttpResponse<ICompany> = await postCompaniesController.handle(idCompany, { body: request.body });

        return response.status(statusCode).send(body);
    });

    app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();