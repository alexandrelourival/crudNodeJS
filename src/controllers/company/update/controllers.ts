import { ICompanyResponse } from '../../../models/company';
import { mapAssets } from '../../../utils/functions';
import { IUpdateCompanyRepository, UpdateCompanyParams } from './protocols';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { responseBadRequest, responseError, responseOk } from '../../helpers';

export class UpdateCompanyController implements IController {

    constructor(private readonly updateCompanyRepository: IUpdateCompanyRepository) { }

    async handle(httpRequest: HttpRequest<UpdateCompanyParams>): Promise<HttpResponse<ICompanyResponse | string>> {

        try {
            if (!httpRequest.params.id || !httpRequest.body) {
                return responseBadRequest('Missing company id or update body.');
            }

            const allowedFieldsToUpdate: (keyof UpdateCompanyParams)[] = ['name', 'description'];

            const notAllowedFields = Object.keys(httpRequest.body).some(
                (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateCompanyParams)
            );

            if (notAllowedFields) {
                return responseBadRequest('Just name and description are allowed to update.');
            }

            const company = await this.updateCompanyRepository.updateCompany(httpRequest.params.id, httpRequest.body);

            const companyResult: ICompanyResponse = { ...company, units: (company.units ? company.units.map(({ assets, ...restAssets }) => ({ ...restAssets, assets: mapAssets(assets!) })) : undefined) };

            return responseOk<ICompanyResponse>(companyResult);
        } catch (error) {
            return responseError('Something went wrong when updating company.');
        }
    }

}