import { IGetCompaniesController, IGetCompaniesRepository, IGetUsersCompanyController, IGetUsersCompanyRepository, IGetCompanyController, IGetCompanyRepository } from './getProtocols'
import { ICompanyRequest, ICompanyResponse } from '../../models/company';
import { IUser } from '../../models/user';
import { IUnitResponse } from '../../models/unit';
import { mapAssets } from '../../utils/functions';
import { HttpRequest } from '../protocols';

export class GetCompaniesController implements IGetCompaniesController {

    constructor(private readonly getCompaniesRepository: IGetCompaniesRepository) { }

    async handle() {
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

export class GetCompanyController implements IGetCompanyController {

    constructor(private readonly getCompanyRepository: IGetCompanyRepository) { }

    async handle(httpRequest: HttpRequest<null>) {
        try {
            const company: ICompanyRequest | null = await this.getCompanyRepository.getCompany(httpRequest.params.id);

            if (company != null) {

                const companyResult: ICompanyResponse = { ...company, units: (company.units ? company.units.map(({ assets, ...restAssets }) => ({ ...restAssets, assets: mapAssets(assets!) })) : undefined) };

                return {
                    statusCode: 200,
                    body: companyResult
                }
            }

            return {
                statusCode: 404,
                body: 'Info: Company not found.'
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting companies.'
            }
        }
    }

}

export class GetUsersCompanyController implements IGetUsersCompanyController {

    constructor(private readonly getUsersCompanyRepository: IGetUsersCompanyRepository) { }

    async handle(httpRequest: HttpRequest<null>) {
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