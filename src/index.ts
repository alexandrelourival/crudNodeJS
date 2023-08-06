import express from 'express'

import { config } from 'dotenv'
import { MongoClient } from './database/mongo';

import { HttpResponse } from './controllers/protocols';

import { ICompanyResponse } from './models/company';
import { IUser } from './models/user';
import { IUnitResponse } from './models/unit';
import { IAssetResponse } from './models/asset';

import { GetCompaniesController, GetCompanyController, GetUsersCompanyController } from './controllers/company/get/controllers';
import { PostCompanyController, PostUserCompanyController } from './controllers/company/post/controllers';
import { GetUnitsController, GetUnitController, GetAssetsUnitController } from './controllers/unit/get/controllers';
import { PostUnitController, PostAssetUnitController } from './controllers/unit/post/controllers';
import { UpdateCompanyController } from './controllers/company/update/controllers';

import { MongoGetCompaniesRepository, MongoGetCompanyRepository, MongoGetUsersCompanyRepository } from './repositories/company/mongoGetCompany';
import { MongoPostCompanyRepository, MongoPostUserCompanyRepository } from './repositories/company/mongoPostCompany';
import { MongoGetUnitsRepository, MongoGetUnitRepository } from './repositories/unit/mongoGetUnit';
import { MongoPostUnitRepository, MongoPostAssetUnitRepository } from './repositories/unit/mongoPostUnit';
import { MongoUpdateCompanyRepository } from './repositories/company/mongoUpdateCompany';
import { MongoDeleteCompanyRepository } from './repositories/company/mongoDeleteCompany';
import { DeleteCompanyController } from './controllers/company/delete/controller';
import { MongoDeleteUnitRepository } from './repositories/unit/mongoDeleteUnit';
import { DeleteUnitController } from './controllers/unit/delete/controller';
import { MongoUpdateUnitRepository } from './repositories/unit/mongoUpdateUnit';
import { UpdateUnitController } from './controllers/unit/update/controllers';


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

    app.get('/companies/:id', async (request, response) => {

        const id = request.params.id;

        const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
        const getCompanyController: GetCompanyController = new GetCompanyController(mongoGetCompanyRepository);

        const { statusCode, body }: HttpResponse<ICompanyResponse | string> = await getCompanyController.handle({ params: { id } });

        return response.status(statusCode).send(body);
    });

    app.get('/companies', async (request, response) => {
        const mongoGetCompaniesRepository: MongoGetCompaniesRepository = new MongoGetCompaniesRepository();
        const getCompaniesController: GetCompaniesController = new GetCompaniesController(mongoGetCompaniesRepository);

        const { statusCode, body }: HttpResponse<ICompanyResponse[] | string> = await getCompaniesController.handle();

        return response.status(statusCode).send(body);
    });

    app.post('/companies', async (request, response) => {

        const mongoPostCompanyRepository: MongoPostCompanyRepository = new MongoPostCompanyRepository();
        const postCompanyController: PostCompanyController = new PostCompanyController(mongoPostCompanyRepository);

        const { statusCode, body }: HttpResponse<string> = await postCompanyController.handle({ body: request.body });

        return response.status(statusCode).send(body);
    });

    app.patch('/companies/:id', async (request, response) => {
        const id = request.params.id;

        const mongoUpdateCompanyRepository: MongoUpdateCompanyRepository = new MongoUpdateCompanyRepository();
        const updateCompanyController: UpdateCompanyController = new UpdateCompanyController(mongoUpdateCompanyRepository);

        const { statusCode, body }: HttpResponse<ICompanyResponse | string> = await updateCompanyController.handle({ params: { id }, body: request.body })

        return response.status(statusCode).send(body);
    });

    app.delete('/companies/:id', async (request, response) => {
        const id = request.params.id;

        const mongoDeleteCompanyRepository: MongoDeleteCompanyRepository = new MongoDeleteCompanyRepository();
        const deleteCompanyController: DeleteCompanyController = new DeleteCompanyController(mongoDeleteCompanyRepository);

        const { statusCode, body }: HttpResponse<string> = await deleteCompanyController.handle({ params: { id }, body: request.body })

        return response.status(statusCode).send(body);
    });

    app.get('/users/:id', async (request, response) => {
        const id = request.params.id;

        const mongoGetUsersCompanyRepository: MongoGetUsersCompanyRepository = new MongoGetUsersCompanyRepository();
        const getUsersCompanyController: GetUsersCompanyController = new GetUsersCompanyController(mongoGetUsersCompanyRepository);

        const { statusCode, body }: HttpResponse<IUser[] | string> = await getUsersCompanyController.handle({ params: { id } });


        return response.status(statusCode).send(body);
    });

    app.post('/users/:id', async (request, response) => {
        const id = request.params.id;

        const mongoPostUserCompanyRepository: MongoPostUserCompanyRepository = new MongoPostUserCompanyRepository();
        const postCompaniesController: PostUserCompanyController = new PostUserCompanyController(mongoPostUserCompanyRepository);

        const { statusCode, body }: HttpResponse<string> = await postCompaniesController.handle({ params: { id }, body: request.body });

        return response.status(statusCode).send(body);
    });

    app.get('/unit/:id', async (request, response) => {

        const id = request.params.id;

        const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
        const getUnitController: GetUnitController = new GetUnitController(mongoGetUnitRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse | string> = await getUnitController.handle({ params: { id } });

        return response.status(statusCode).send(body);
    });

    app.get('/units', async (request, response) => {
        const mongoGetUnitsRepository: MongoGetUnitsRepository = new MongoGetUnitsRepository();
        const getUnitsController: GetUnitsController = new GetUnitsController(mongoGetUnitsRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse[] | string> = await getUnitsController.handle({});

        return response.status(statusCode).send(body);
    });

    app.get('/units/:id', async (request, response) => {

        const id = request.params.id;

        const mongoGetUnitsRepository: MongoGetUnitsRepository = new MongoGetUnitsRepository();
        const getUnitsController: GetUnitsController = new GetUnitsController(mongoGetUnitsRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse[] | string> = await getUnitsController.handle({ params: { id } });

        return response.status(statusCode).send(body);
    });

    app.post('/units', async (request, response) => {

        const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
        const mongoPostUnitRepository: MongoPostUnitRepository = new MongoPostUnitRepository();

        const postUnitController: PostUnitController = new PostUnitController(mongoGetCompanyRepository, mongoPostUnitRepository);

        const { statusCode, body }: HttpResponse<string> = await postUnitController.handle({ body: request.body });

        return response.status(statusCode).send(body);
    });

    app.patch('/unit/:id', async (request, response) => {
        const id = request.params.id;

        const mongoUpdateUnitRepository: MongoUpdateUnitRepository = new MongoUpdateUnitRepository();
        const updateUnitController: UpdateUnitController = new UpdateUnitController(mongoUpdateUnitRepository);

        const { statusCode, body }: HttpResponse<IUnitResponse | string> = await updateUnitController.handle({ params: { id }, body: request.body })

        return response.status(statusCode).send(body);
    });

    app.delete('/unit/:id', async (request, response) => {
        const id = request.params.id;

        const mongoDeleteUnitRepository: MongoDeleteUnitRepository = new MongoDeleteUnitRepository();
        const deleteUnitController: DeleteUnitController = new DeleteUnitController(mongoDeleteUnitRepository);

        const { statusCode, body }: HttpResponse<string> = await deleteUnitController.handle({ params: { id }, body: request.body })

        return response.status(statusCode).send(body);
    });

    app.get('/assets/:id', async (request, response) => {
        const id = request.params.id;

        const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
        const getAssetsUnitController: GetAssetsUnitController = new GetAssetsUnitController(mongoGetUnitRepository);

        const { statusCode, body }: HttpResponse<IAssetResponse[] | string> = await getAssetsUnitController.handle({ params: { id } });


        return response.status(statusCode).send(body);
    });

    app.post('/assets/:id', async (request, response) => {
        const id = request.params.id;

        const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
        const mongoPostAssetUnitRepository: MongoPostAssetUnitRepository = new MongoPostAssetUnitRepository();

        const postAssetsUnitsController: PostAssetUnitController = new PostAssetUnitController(mongoGetUnitRepository, mongoPostAssetUnitRepository);

        const { statusCode, body }: HttpResponse<string> = await postAssetsUnitsController.handle({ params: { id }, body: request.body });

        return response.status(statusCode).send(body);
    });


    app.listen(port, () => console.log(`Listening on port ${port}!`));
};

main();