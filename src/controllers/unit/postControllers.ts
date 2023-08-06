import { IPostAssetUnitController, IPostAssetUnitRepository, IPostUnitController, IPostUnitRepository } from './postProtocols';
import { IAssetRequest } from '../../models/asset';
import { IUnitRequest } from '../../models/unit';
import { HttpRequest } from '../protocols'
import { IGetCompanyRepository } from '../company/getProtocols';
import { IGetUnitRepository } from './getProtocols';

export class PostUnitController implements IPostUnitController {

    constructor(private readonly getCompanyRepository: IGetCompanyRepository, private readonly postUnitRepository: IPostUnitRepository) { }

    async handle(httpRequest: HttpRequest<IUnitRequest>) {
        try {

            const companyResult = await this.getCompanyRepository.getCompany(httpRequest.body!.idCompany);

            if (!companyResult) {
                throw new Error('Company id not exist');
            }

            await this.postUnitRepository.postUnit(companyResult, httpRequest.body!);

            return {
                statusCode: 201
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when postting unit.'
            }
        }
    }

}

export class PostAssetUnitController implements IPostAssetUnitController {

    constructor(private readonly getCompanyRepository: IGetCompanyRepository, private readonly getUnitRepository: IGetUnitRepository, private readonly postAssetUnitRepository: IPostAssetUnitRepository) { }

    async handle(httpRequest: HttpRequest<IAssetRequest>) {
        try {

            const unit = await this.getUnitRepository.getUnit(httpRequest.params.id);

            if (!unit) {
                throw new Error('Unit id not exist.');
            }

            const company = await this.getCompanyRepository.getCompany(unit.idCompany);

            await this.postAssetUnitRepository.postAsset(company!, unit, httpRequest.body!);

            return {
                statusCode: 201
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when postting asset to unit.'
            }
        }
    }

}