import { IPostUserCompanyController, IPostUserCompanyRepository, IPostCompanyController, IPostCompanyRepository } from './postProtocols';
import { IUser } from '../../models/user';
import { ICompanyRequest, ICompanyResponse } from '../../models/company';
import { HttpRequest } from '../protocols'
import { mapAssets } from '../../utils/functions';

export class PostCompanyController implements IPostCompanyController {

    constructor(private readonly postCompanyRepository: IPostCompanyRepository) { }

    async handle(httpRequest: HttpRequest<ICompanyRequest>) {
        try {
            const company = await this.postCompanyRepository.postCompany(httpRequest.body!);

            const companyResult: ICompanyResponse = { ...company, units: (company.units ? company.units.map(({ assets, ...restAssets }) => ({ ...restAssets, assets: mapAssets(assets!) })) : undefined) };

            return {
                statusCode: 201,
                body: companyResult
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when postting company.'
            }
        }
    }

}

export class PostUserCompanyController implements IPostUserCompanyController {

    constructor(private readonly postUserCompanyRepository: IPostUserCompanyRepository) { }

    async handle(id: string, httpRequest: HttpRequest<IUser>) {
        try {
            await this.postUserCompanyRepository.postUser(id, httpRequest.body!);

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