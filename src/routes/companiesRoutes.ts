
import { DeleteCompanyController } from './../controllers/company/delete/controller';
import { GetCompaniesController, GetCompanyController } from './../controllers/company/get/controllers';
import { PostCompanyController } from './../controllers/company/post/controllers';
import { UpdateCompanyController } from './../controllers/company/update/controllers';
import { HttpResponse } from './../controllers/protocols';
import express, { Router } from 'express';
import { ICompanyResponse } from './../models/company';
import { MongoDeleteCompanyRepository } from './../repositories/company/mongoDeleteCompany';
import { MongoGetCompaniesRepository, MongoGetCompanyRepository } from './../repositories/company/mongoGetCompany';
import { MongoPostCompanyRepository } from './../repositories/company/mongoPostCompany';
import { MongoUpdateCompanyRepository } from './../repositories/company/mongoUpdateCompany';

const companiesRouter: Router = express.Router();

companiesRouter.get('/companies/:id', async (request, response) => {
    const id = request.params.id;

    const mongoGetCompanyRepository: MongoGetCompanyRepository = new MongoGetCompanyRepository();
    const getCompanyController: GetCompanyController = new GetCompanyController(mongoGetCompanyRepository);

    const { statusCode, body }: HttpResponse<ICompanyResponse | string> = await getCompanyController.handle({ params: { id } });

    return response.status(statusCode).send(body);
});

companiesRouter.get('/companies', async (request, response) => {

    const mongoGetCompaniesRepository: MongoGetCompaniesRepository = new MongoGetCompaniesRepository();
    const getCompaniesController: GetCompaniesController = new GetCompaniesController(mongoGetCompaniesRepository);

    const { statusCode, body }: HttpResponse<ICompanyResponse[] | string> = await getCompaniesController.handle();

    return response.status(statusCode).send(body);
});

companiesRouter.post('/companies', async (request, response) => {
    const mongoPostCompanyRepository: MongoPostCompanyRepository = new MongoPostCompanyRepository();
    const postCompanyController: PostCompanyController = new PostCompanyController(mongoPostCompanyRepository);

    const { statusCode, body }: HttpResponse<string> = await postCompanyController.handle({ body: request.body });

    return response.status(statusCode).send(body);
});

companiesRouter.patch('/companies/:id', async (request, response) => {
    const id = request.params.id;

    const mongoUpdateCompanyRepository: MongoUpdateCompanyRepository = new MongoUpdateCompanyRepository();
    const updateCompanyController: UpdateCompanyController = new UpdateCompanyController(mongoUpdateCompanyRepository);

    const { statusCode, body }: HttpResponse<ICompanyResponse | string> = await updateCompanyController.handle({ params: { id }, body: request.body })

    return response.status(statusCode).send(body);
});

companiesRouter.delete('/companies/:id', async (request, response) => {
    const id = request.params.id;

    const mongoDeleteCompanyRepository: MongoDeleteCompanyRepository = new MongoDeleteCompanyRepository();
    const deleteCompanyController: DeleteCompanyController = new DeleteCompanyController(mongoDeleteCompanyRepository);

    const { statusCode, body }: HttpResponse<string> = await deleteCompanyController.handle({ params: { id }, body: request.body })

    return response.status(statusCode).send(body);
});

export default companiesRouter;