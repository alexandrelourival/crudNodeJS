import { IPostAssetUnitRepository, IPostUnitRepository } from './protocols';
import { IAssetRequest } from '../../../models/asset';
import { IUnitRequest } from '../../../models/unit';
import { HttpRequest, HttpResponse, IController } from '../../protocols'
import { IGetCompanyRepository } from '../../company/get/protocols';
import { IGetUnitRepository } from '../get/protocols';
import { responseBadRequest, responseCreated, responseError } from '../../helpers';
import { verifyRequiredParams } from '../../../utils/functions';
import { requiredAssetParams, requiredUnitParams } from '../../../utils/consts';

export class PostUnitController implements IController {

    constructor(private readonly getCompanyRepository: IGetCompanyRepository, private readonly postUnitRepository: IPostUnitRepository) { }

    async handle(httpRequest: HttpRequest<IUnitRequest>): Promise<HttpResponse<string>> {
        try {

            const notAllowedBodyParams = !verifyRequiredParams(httpRequest.body, requiredUnitParams);

            if (notAllowedBodyParams) {
                return responseBadRequest('Missing some required body param.');
            }

            const companyResult = await this.getCompanyRepository.getCompany(httpRequest.body!.idCompany);

            await this.postUnitRepository.postUnit(companyResult, httpRequest.body!);

            return responseCreated();
        } catch (error) {
            return responseError('Something went wrong when postting unit.');
        }
    }

}

export class PostAssetUnitController implements IController {

    constructor(private readonly getUnitRepository: IGetUnitRepository, private readonly postAssetUnitRepository: IPostAssetUnitRepository) { }

    async handle(httpRequest: HttpRequest<IAssetRequest>): Promise<HttpResponse<string>> {
        try {

            if (!httpRequest.params.id || !httpRequest.body || !verifyRequiredParams(httpRequest.body, requiredAssetParams)) {
                return responseBadRequest('Missing unit id or some body params.');
            }

            if ((typeof (httpRequest.body.status) !== 'number') || httpRequest.body.status > 2 || httpRequest.body.status < 0) {
                return responseBadRequest('Asset status needs to be -> 0 - Running | 1 - Alerting | 2 - Stopped.');
            }

            if ((typeof (httpRequest.body.health) !== 'number') || httpRequest.body.health < 0 || httpRequest.body.health > 100) {
                return responseBadRequest('Asset health needs to be a number and should be within the range of 0 to 100.');
            }

            const unit = await this.getUnitRepository.getUnit(httpRequest.params.id);

            await this.postAssetUnitRepository.postAsset(unit, httpRequest.body!);

            return responseCreated();

        } catch (error) {
            return responseError('Something went wrong when postting asset to unit.');
        }
    }

}