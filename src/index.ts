import express from 'express'

import { config } from 'dotenv'
import { MongoClient } from './database/mongo';

import { HttpResponse } from './controllers/protocols';

import { IUnitResponse } from './models/unit';
import { IAssetResponse } from './models/asset';

import { GetCompaniesController, GetCompanyController, GetUsersCompanyController } from './controllers/company/getControllers';
import { PostCompanyController, PostUserCompanyController } from './controllers/company/postControllers';
import { GetUnitsController, GetUnitController, GetAssetsUnitController } from './controllers/unit/getControllers';
import { PostUnitController, PostAssetUnitController } from './controllers/unit/postControllers';

import { MongoGetCompaniesRepository, MongoGetCompanyRepository, MongoGetUsersCompanyRepository } from './repositories/company/mongoGetCompany';
import { MongoPostCompanyRepository, MongoPostUserCompanyRepository } from './repositories/company/mongoPostCompany';
import { MongoGetUnitsRepository, MongoGetUnitRepository } from './repositories/unit/mongoGetUnit';
import { MongoPostUnitRepository, MongoPostAssetUnitRepository } from './repositories/unit/mongoPostUnit';
import { ICompanyResponse } from './models/company';
import { IUser } from './models/user';


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

    app.get('/company/:id', async (request, response) => {

        const id = request.params.id;

        const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
        const getCompanyController: GetCompanyController = new GetCompanyController(mongoGetCompanyRepository);

        const { statusCode, body }: HttpResponse<ICompanyResponse> = await getCompanyController.handle(id);

        return response.status(statusCode).send(body);
    });

    app.get('/companies', async (request, response) => {
        const mongoGetCompaniesRepository: MongoGetCompaniesRepository = new MongoGetCompaniesRepository();
        const getCompaniesController: GetCompaniesController = new GetCompaniesController(mongoGetCompaniesRepository);

        const { statusCode, body }: HttpResponse<ICompanyResponse[]> = await getCompaniesController.handle();

        return response.status(statusCode).send(body);
    });

    app.post('/companies', async (request, response) => {

        const mongoPostCompanyRepository: MongoPostCompanyRepository = new MongoPostCompanyRepository();
        const postCompanyController: PostCompanyController = new PostCompanyController(mongoPostCompanyRepository);

        const { statusCode, body }: HttpResponse<ICompanyResponse> = await postCompanyController.handle({ body: request.body });

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

        const { statusCode, body }: HttpResponse<ICompanyResponse> = await postCompaniesController.handle(idCompany, { body: request.body });

        return response.status(statusCode).send(body);
    });

    app.get('/unit/:id', async (request, response) => {

        const id = request.params.id;

        const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
        const getUnitController: GetUnitController = new GetUnitController(mongoGetUnitRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse> = await getUnitController.handle({ params: { id } });

        return response.status(statusCode).send(body);
    });

    app.get('/units', async (request, response) => {
        const mongoGetUnitsRepository: MongoGetUnitsRepository = new MongoGetUnitsRepository();
        const getUnitsController: GetUnitsController = new GetUnitsController(mongoGetUnitsRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse[]> = await getUnitsController.handle({});

        return response.status(statusCode).send(body);
    });

    app.get('/units/:id', async (request, response) => {

        const id = request.params.id;

        const mongoGetUnitsRepository: MongoGetUnitsRepository = new MongoGetUnitsRepository();
        const getUnitsController: GetUnitsController = new GetUnitsController(mongoGetUnitsRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse[]> = await getUnitsController.handle({ params: { id } });

        return response.status(statusCode).send(body);
    });

    app.post('/units', async (request, response) => {

        const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
        const mongoPostUnitRepository: MongoPostUnitRepository = new MongoPostUnitRepository();

        const postUnitController: PostUnitController = new PostUnitController(mongoGetCompanyRepository, mongoPostUnitRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse> = await postUnitController.handle({ body: request.body });

        return response.status(statusCode).send(body);
    });

    app.get('/assets/:id', async (request, response) => {
        const id = request.params.id;

        const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
        const getAssetsUnitController: GetAssetsUnitController = new GetAssetsUnitController(mongoGetUnitRepository);

        const { statusCode, body }: HttpResponse<IAssetResponse[]> = await getAssetsUnitController.handle({ params: { id } });


        return response.status(statusCode).send(body);
    });

    app.post('/assets/:id', async (request, response) => {
        const id = request.params.id;

        const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
        const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
        const mongoPostAssetUnitRepository: MongoPostAssetUnitRepository = new MongoPostAssetUnitRepository();

        const postAssetsUnitsController: PostAssetUnitController = new PostAssetUnitController(mongoGetCompanyRepository, mongoGetUnitRepository, mongoPostAssetUnitRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse> = await postAssetsUnitsController.handle({ params: { id }, body: request.body });

        return response.status(statusCode).send(body);
    });


    app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();