import { ICompanyResponse } from '../../models/company';
import { mapAssets } from '../../utils/functions';
import { IUpdateCompanyRepository, UpdateCompanyParams } from './updateProtocols';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class UpdateCompanyController implements IController {

    constructor(private readonly updateCompanyRepository: IUpdateCompanyRepository) { }

    async handle(httpRequest: HttpRequest<UpdateCompanyParams>): Promise<HttpResponse<ICompanyResponse>> {

        try {
            if (!httpRequest.params.id || !httpRequest.body) {
                return {
                    statusCode: 400,
                    body: "Info: Missing company id or update body."
                }
            }

            const allowedFieldsToUpdate: (keyof UpdateCompanyParams)[] = ['name', 'description'];

            const notAllowedFields = Object.keys(httpRequest.body).some(
                (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateCompanyParams)
            );

            if (notAllowedFields) {
                return {
                    statusCode: 400,
                    body: "Info: Just name and description are allowed to update."
                }
            }

            if (!httpRequest.body) {
                return {
                    statusCode: 400
                }
            }
            const company = await this.updateCompanyRepository.updateCompany(httpRequest.params.id, httpRequest.body);

            const companyResult: ICompanyResponse = { ...company, units: (company.units ? company.units.map(({ assets, ...restAssets }) => ({ ...restAssets, assets: mapAssets(assets!) })) : undefined) };

            return {
                statusCode: 200,
                body: companyResult

            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting companies.'
            }
        }
    }

}