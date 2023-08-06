import { IPostAssetUnitRepository, IPostUnitRepository } from './postProtocols';
import { IAssetRequest } from '../../models/asset';
import { IUnitRequest } from '../../models/unit';
import { HttpRequest, HttpResponse, IController } from '../protocols'
import { IGetCompanyRepository } from '../company/getProtocols';
import { IGetUnitRepository } from './getProtocols';

export class PostUnitController implements IController {

    constructor(private readonly getCompanyRepository: IGetCompanyRepository, private readonly postUnitRepository: IPostUnitRepository) { }

    async handle(httpRequest: HttpRequest<IUnitRequest>): Promise<HttpResponse<void>> {
        try {

            const companyResult = await this.getCompanyRepository.getCompany(httpRequest.body!.idCompany);

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

export class PostAssetUnitController implements IController {

    constructor(private readonly getUnitRepository: IGetUnitRepository, private readonly postAssetUnitRepository: IPostAssetUnitRepository) { }

    async handle(httpRequest: HttpRequest<IAssetRequest>): Promise<HttpResponse<void>> {
        try {

            const unit = await this.getUnitRepository.getUnit(httpRequest.params.id);

            await this.postAssetUnitRepository.postAsset(unit, httpRequest.body!);

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