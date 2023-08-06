import { IPostUserCompanyRepository, IPostCompanyRepository } from './postProtocols';
import { IUser } from '../../models/user';
import { ICompanyRequest } from '../../models/company';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class PostCompanyController implements IController {

    constructor(private readonly postCompanyRepository: IPostCompanyRepository) { }

    async handle(httpRequest: HttpRequest<ICompanyRequest>): Promise<HttpResponse<void>> {
        try {

            await this.postCompanyRepository.postCompany(httpRequest.body!);

            return {
                statusCode: 201
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when postting company.'
            }
        }
    }

}

export class PostUserCompanyController implements IController {

    constructor(private readonly postUserCompanyRepository: IPostUserCompanyRepository) { }

    async handle(httpRequest: HttpRequest<IUser>): Promise<HttpResponse<void>> {
        try {
            await this.postUserCompanyRepository.postUser(httpRequest.params.id, httpRequest.body!);

            return {
                statusCode: 201
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when postting user to company.'
            }
        }
    }

}