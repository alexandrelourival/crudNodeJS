import { IGetCompaniesController, IGetCompaniesRepository, IGetUsersCompanyController, IGetUsersCompanyRepository, IGetCompanyController, IGetCompanyRepository } from './getProtocols'
import { ICompany } from '../../models/company';
import { IUser } from '../../models/user';

export class GetCompaniesController implements IGetCompaniesController {

    constructor(private readonly getCompaniesRepository: IGetCompaniesRepository) { }

    async handle() {
        try {
            const companies: ICompany[] = await this.getCompaniesRepository.getCompanies();

            return {
                statusCode: 200,
                body: companies
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

    async handle(id: string) {
        try {
            const company = await this.getCompanyRepository.getCompany(id);

            if (company != null) {
                return {
                    statusCode: 200,
                    body: company
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

    async handle(id: string) {
        try {
            const users: IUser[] = await this.getUsersCompanyRepository.getUsers(id);

            return {
                statusCode: 200,
                body: users
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting users of company.'
            }
        }
    }

}