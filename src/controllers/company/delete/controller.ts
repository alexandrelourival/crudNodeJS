import { IDeleteCompanyRepository } from './protocols';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { responseBadRequest, responseError, responseOk } from '../../helpers';

export class DeleteCompanyController implements IController {

    constructor(private readonly updateCompanyRepository: IDeleteCompanyRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<string>> {

        try {
            if (!httpRequest.params.id) {
                return responseBadRequest('Missing company id.');
            }

            await this.updateCompanyRepository.updateCompany(httpRequest.params.id);

            return responseOk<string>('Company and sub-categories was deleted.');
        } catch (error) {
            return responseError('Something went wrong when try delete company.');
        }
    }

}