import { HttpResponse } from './../controllers/protocols';
import { DeleteUnitController } from './../controllers/unit/delete/controller';
import { GetUnitController, GetUnitsController } from './../controllers/unit/get/controllers';
import { PostUnitController } from './../controllers/unit/post/controllers';
import { UpdateUnitController } from './../controllers/unit/update/controllers';
import { IUnitResponse } from './../models/unit';
import { MongoGetCompanyRepository } from './../repositories/company/mongoGetCompany';
import { MongoDeleteUnitRepository } from './../repositories/unit/mongoDeleteUnit';
import { MongoGetUnitRepository, MongoGetUnitsRepository } from './../repositories/unit/mongoGetUnit';
import { MongoPostUnitRepository } from './../repositories/unit/mongoPostUnit';
import { MongoUpdateUnitRepository } from './../repositories/unit/mongoUpdateUnit';
import express, { Router } from 'express';

const unitsRouter: Router = express.Router();

unitsRouter.get('/unit/:id', async (request, response) => {

    const id = request.params.id;

    const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
    const getUnitController: GetUnitController = new GetUnitController(mongoGetUnitRepository);

    const { statusCode, body }: HttpResponse<IUnitResponse | string> = await getUnitController.handle({ params: { id } });

    return response.status(statusCode).send(body);
});

unitsRouter.get('/units', async (request, response) => {
    const mongoGetUnitsRepository: MongoGetUnitsRepository = new MongoGetUnitsRepository();
    const getUnitsController: GetUnitsController = new GetUnitsController(mongoGetUnitsRepository);

    const { statusCode, body }: HttpResponse<IUnitResponse[] | string> = await getUnitsController.handle({});

    return response.status(statusCode).send(body);
});

unitsRouter.get('/units/:id', async (request, response) => {

    const id = request.params.id;

    const mongoGetUnitsRepository: MongoGetUnitsRepository = new MongoGetUnitsRepository();
    const getUnitsController: GetUnitsController = new GetUnitsController(mongoGetUnitsRepository);

    const { statusCode, body }: HttpResponse<IUnitResponse[] | string> = await getUnitsController.handle({ params: { id } });

    return response.status(statusCode).send(body);
});

unitsRouter.post('/units', async (request, response) => {

    const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
    const mongoPostUnitRepository: MongoPostUnitRepository = new MongoPostUnitRepository();

    const postUnitController: PostUnitController = new PostUnitController(mongoGetCompanyRepository, mongoPostUnitRepository);

    const { statusCode, body }: HttpResponse<string> = await postUnitController.handle({ body: request.body });

    return response.status(statusCode).send(body);
});

unitsRouter.patch('/unit/:id', async (request, response) => {
    const id = request.params.id;

    const mongoUpdateUnitRepository: MongoUpdateUnitRepository = new MongoUpdateUnitRepository();
    const updateUnitController: UpdateUnitController = new UpdateUnitController(mongoUpdateUnitRepository);

    const { statusCode, body }: HttpResponse<IUnitResponse | string> = await updateUnitController.handle({ params: { id }, body: request.body })

    return response.status(statusCode).send(body);
});

unitsRouter.delete('/unit/:id', async (request, response) => {
    const id = request.params.id;

    const mongoDeleteUnitRepository: MongoDeleteUnitRepository = new MongoDeleteUnitRepository();
    const deleteUnitController: DeleteUnitController = new DeleteUnitController(mongoDeleteUnitRepository);

    const { statusCode, body }: HttpResponse<string> = await deleteUnitController.handle({ params: { id }, body: request.body })

    return response.status(statusCode).send(body);
});

export default unitsRouter;