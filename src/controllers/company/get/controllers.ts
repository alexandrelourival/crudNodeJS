import { IGetCompaniesRepository, IGetUsersCompanyRepository, IGetCompanyRepository } from './protocols'
import { ICompanyRequest, ICompanyResponse } from '../../../models/company';
import { IUser } from '../../../models/user';
import { IUnitResponse } from '../../../models/unit';
import { mapAssets } from '../../../utils/functions';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { responseError, responseNotFound, responseOk } from '../../helpers';

export class GetCompaniesController implements IController {

    constructor(private readonly getCompaniesRepository: IGetCompaniesRepository) { }

    async handle(): Promise<HttpResponse<ICompanyResponse[] | string>> {
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
                return responseOk<ICompanyResponse[]>(companiesResult);
            }

            return responseNotFound('Companies not found.');
        } catch (error) {
            return responseError('Something went wrong when getting companies.');
        }
    }

}

export class GetCompanyController implements IController {

    constructor(private readonly getCompanyRepository: IGetCompanyRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<ICompanyResponse | string>> {
        try {
            const company: ICompanyRequest = await this.getCompanyRepository.getCompany(httpRequest.params.id);

            const companyResult: ICompanyResponse = { ...company, units: (company.units ? company.units.map(({ assets, ...restAssets }) => ({ ...restAssets, assets: mapAssets(assets!) })) : undefined) };

            return responseOk<ICompanyResponse>(companyResult);
        } catch (error) {
            return responseError('Something went wrong when getting company.');
        }
    }

}

export class GetUsersCompanyController implements IController {

    constructor(private readonly getUsersCompanyRepository: IGetUsersCompanyRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IUser[] | string>> {
        try {
            const users: IUser[] = await this.getUsersCompanyRepository.getUsers(httpRequest.params.id);

            if (users.length > 0) {
                return responseOk<IUser[]>(users);
            }

            return responseNotFound("This Company don't have users.");
        } catch (error) {
            return responseError('Something went wrong when getting users of company.')
        }
    }

}