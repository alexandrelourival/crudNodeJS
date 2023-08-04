import { IGetCompaniesController, IGetCompaniesRepository } from './protocols'
import { Company } from "../../models/company";

export class GetCompaniesController implements IGetCompaniesController {

    constructor(private readonly getCompaniesRepository: IGetCompaniesRepository) { }

    async handle() {
        try {
            const companies: Company[] = await this.getCompaniesRepository.getCompanies();

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