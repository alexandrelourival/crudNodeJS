import { IPostUserCompanyRepository, IPostCompanyRepository } from './protocols';
import { IUser } from '../../../models/user';
import { ICompanyRequest } from '../../../models/company';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { responseBadRequest, responseCreated, responseError } from '../../helpers';
import { verifyRequiredParams } from '../../../utils/functions';
import { requiredCompanyParams, requiredUserParams } from '../../../utils/consts';

export class PostCompanyController implements IController {

    constructor(private readonly postCompanyRepository: IPostCompanyRepository) { }

    async handle(httpRequest: HttpRequest<ICompanyRequest>): Promise<HttpResponse<string>> {
        try {
            const notAllowedBodyParams = !verifyRequiredParams(httpRequest.body, requiredCompanyParams);

            if (notAllowedBodyParams) {
                return responseBadRequest('Missing some body param required.');
            }

            await this.postCompanyRepository.postCompany(httpRequest.body!);

            return responseCreated();
        } catch (error) {
            return responseError('Something went wrong when postting company.');
        }
    }

}

export class PostUserCompanyController implements IController {

    constructor(private readonly postUserCompanyRepository: IPostUserCompanyRepository) { }

    async handle(httpRequest: HttpRequest<IUser>): Promise<HttpResponse<string>> {
        try {
            const notAllowedBodyParams = !verifyRequiredParams(httpRequest.body, requiredUserParams);

            if (notAllowedBodyParams) {
                return responseBadRequest('Missing some body param required.');
            }

            await this.postUserCompanyRepository.postUser(httpRequest.params.id, httpRequest.body!);

            return responseCreated();
        } catch (error) {
            return responseError('Something went wrong when postting user to company.');
        }
    }

}