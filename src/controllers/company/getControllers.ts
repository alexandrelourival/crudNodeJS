import { IGetCompaniesRepository, IGetUsersCompanyRepository, IGetCompanyRepository } from './getProtocols'
import { ICompanyRequest, ICompanyResponse } from '../../models/company';
import { IUser } from '../../models/user';
import { IUnitResponse } from '../../models/unit';
import { mapAssets } from '../../utils/functions';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class GetCompaniesController implements IController {

    constructor(private readonly getCompaniesRepository: IGetCompaniesRepository) { }

    async handle(): Promise<HttpResponse<ICompanyResponse[]>> {
        try {
            const companies: ICompanyRequest[] = await this.getCompaniesRepository.getCompanies();

            const companiesResult: ICompanyResponse[] = companies.map(({ units, ...rest }) => {
                let unitsResult: IUnitResponse[] | undefined = undefined;
                if (units) {
                    unitsResult = units.map(({ assets, ...restAssets }) => ({ ...restAssets, assets: mapAssets(assets) }));
                }
                return ({ ...rest, units: unitsResult });
            });

            if (companiesResult.length > 0) {
                return {
                    statusCode: 200,
                    body: companiesResult
                }
            }

            return {
                statusCode: 404,
                body: 'Info: Companies not found.'
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting companies.'
            }
        }
    }

}

export class GetCompanyController implements IController {

    constructor(private readonly getCompanyRepository: IGetCompanyRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<ICompanyResponse>> {
        try {
            const company: ICompanyRequest = await this.getCompanyRepository.getCompany(httpRequest.params.id);

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

export class GetUsersCompanyController implements IController {

    constructor(private readonly getUsersCompanyRepository: IGetUsersCompanyRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IUser[]>> {
        try {
            const users: IUser[] = await this.getUsersCompanyRepository.getUsers(httpRequest.params.id);

            if (users.length > 0) {
                return {
                    statusCode: 200,
                    body: users
                }
            }

            return {
                statusCode: 404,
                body: "Info: This Company don't have users."
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting users of company.'
            }
        }
    }

}