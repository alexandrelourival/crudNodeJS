import { IGetUnitsRepository, IGetUnitRepository } from './protocols'
import { IUnitRequest, IUnitResponse } from '../../../models/unit';
import { IAssetResponse } from '../../../models/asset';
import { statusEnum } from '../../../utils/enum';
import { mapAssets } from '../../../utils/functions';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { responseError, responseNotFound, responseOk } from '../../helpers';

export class GetUnitsController implements IController {

    constructor(private readonly getUnitsRepository: IGetUnitsRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IUnitResponse[] | string>> {
        try {
            const units: IUnitRequest[] = await this.getUnitsRepository.getUnits();

            const unitsResponse: IUnitResponse[] = units.map(({ assets, ...rest }) => ({ ...rest, assets: mapAssets(assets!) }));

            const unitsResult = httpRequest.params?.id ? unitsResponse.filter((unitsResponse) => unitsResponse.idCompany == httpRequest.params.id!) : unitsResponse;

            if (unitsResult.length > 0) {
                return responseOk<IUnitResponse[]>(unitsResult);
            }

            return responseNotFound('Units not found.');
        } catch (error) {
            return responseError('Something went wrong when getting units.');
        }
    }

}

export class GetUnitController implements IController {

    constructor(private readonly getUnitRepository: IGetUnitRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IUnitResponse | string>> {
        try {
            const unit: IUnitRequest = await this.getUnitRepository.getUnit(httpRequest.params.id);


            const unitResponse: IUnitResponse = { ...unit, assets: mapAssets(unit.assets!) };

            return responseOk<IUnitResponse>(unitResponse);
        } catch (error) {
            return responseError('Something went wrong when getting unit.');
        }
    }

}

export class GetAssetsUnitController implements IController {

    constructor(private readonly getUnitRepository: IGetUnitRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IAssetResponse[] | string>> {
        try {

            const unit: IUnitRequest = await this.getUnitRepository.getUnit(httpRequest.params.id);

            if (!unit.assets) {
                return responseNotFound("Info: This Unit don't have assets.");
            }

            const assetsResult: IAssetResponse[] = unit.assets.map(({ status, health, ...rest }) => ({ ...rest, status: statusEnum[status], health: `${health}%` }));

            return responseOk<IAssetResponse[]>(assetsResult);
        } catch (error) {
            return responseError('Something went wrong when getting assets of unit.');
        }
    }

}