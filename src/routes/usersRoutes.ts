import { GetUsersCompanyController } from './../controllers/company/get/controllers';
import { PostUserCompanyController } from './../controllers/company/post/controllers';
import { HttpResponse } from './../controllers/protocols';
import { IUser } from './../models/user';
import { MongoGetUsersCompanyRepository } from './../repositories/company/mongoGetCompany';
import { MongoPostUserCompanyRepository } from './../repositories/company/mongoPostCompany';
import express, { Router } from 'express';

const usersRouter: Router = express.Router();

usersRouter.get('/users/:id', async (request, response) => {
    const id = request.params.id;

    const mongoGetUsersCompanyRepository: MongoGetUsersCompanyRepository = new MongoGetUsersCompanyRepository();
    const getUsersCompanyController: GetUsersCompanyController = new GetUsersCompanyController(mongoGetUsersCompanyRepository);

    const { statusCode, body }: HttpResponse<IUser[] | string> = await getUsersCompanyController.handle({ params: { id } });


    return response.status(statusCode).send(body);
});

usersRouter.post('/users/:id', async (request, response) => {
    const id = request.params.id;

    const mongoPostUserCompanyRepository: MongoPostUserCompanyRepository = new MongoPostUserCompanyRepository();
    const postCompaniesController: PostUserCompanyController = new PostUserCompanyController(mongoPostUserCompanyRepository);

    const { statusCode, body }: HttpResponse<string> = await postCompaniesController.handle({ params: { id }, body: request.body });

    return response.status(statusCode).send(body);
});

export default usersRouter;