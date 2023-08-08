import { HttpResponse } from './../controllers/protocols';
import { GetAssetsUnitController } from './../controllers/unit/get/controllers';
import { PostAssetUnitController } from './../controllers/unit/post/controllers';
import { IAssetResponse } from './../models/asset';
import { MongoGetUnitRepository } from './../repositories/unit/mongoGetUnit';
import { MongoPostAssetUnitRepository } from './../repositories/unit/mongoPostUnit';
import express, { Router } from 'express';

const assetsRouter: Router = express.Router();


assetsRouter.get('/assets/:id', async (request, response) => {
    const id = request.params.id;

    const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
    const getAssetsUnitController: GetAssetsUnitController = new GetAssetsUnitController(mongoGetUnitRepository);

    const { statusCode, body }: HttpResponse<IAssetResponse[] | string> = await getAssetsUnitController.handle({ params: { id } });


    return response.status(statusCode).send(body);
});

assetsRouter.post('/assets/:id', async (request, response) => {
    const id = request.params.id;

    const mongoGetUnitRepository: MongoGetUnitRepository = new MongoGetUnitRepository();
    const mongoPostAssetUnitRepository: MongoPostAssetUnitRepository = new MongoPostAssetUnitRepository();

    const postAssetsUnitsController: PostAssetUnitController = new PostAssetUnitController(mongoGetUnitRepository, mongoPostAssetUnitRepository);

    const { statusCode, body }: HttpResponse<string> = await postAssetsUnitsController.handle({ params: { id }, body: request.body });

    return response.status(statusCode).send(body);
});

export default assetsRouter;