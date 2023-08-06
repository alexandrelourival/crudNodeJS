import { IDeleteCompanyController, IDeleteCompanyRepository } from './deleteProtocols';
import { HttpRequest } from '../protocols';

export class DeleteCompanyController implements IDeleteCompanyController {

    constructor(private readonly updateCompanyRepository: IDeleteCompanyRepository) { }

    async handle(httpRequest: HttpRequest<void>) {

        try {
            if (!httpRequest.params.id) {
                return {
                    statusCode: 400,
                    body: "Info: Missing company id."
                }
            }

            await this.updateCompanyRepository.updateCompany(httpRequest.params.id);

            return {
                statusCode: 200,
                body: 'Info: Company and sub-categories was deleted.'
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting companies.'
            }
        }
    }

}