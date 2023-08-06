import { IGetUnitsRepository, IGetUnitRepository } from './getProtocols'
import { IUnitRequest, IUnitResponse } from '../../models/unit';
import { IAssetResponse } from '../../models/asset';
import { statusEnum } from '../../utils/enum';
import { mapAssets } from '../../utils/functions';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class GetUnitsController implements IController {

    constructor(private readonly getUnitsRepository: IGetUnitsRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IUnitResponse[]>> {
        try {
            const units: IUnitRequest[] = await this.getUnitsRepository.getUnits();

            const unitsResponse: IUnitResponse[] = units.map(({ assets, ...rest }) => ({ ...rest, assets: mapAssets(assets!) }));

            const unitsResult = httpRequest.params?.id ? unitsResponse.filter((unitsResponse) => unitsResponse.idCompany == httpRequest.params.id!) : unitsResponse;

            if (unitsResult.length > 0) {

                return {
                    statusCode: 200,
                    body: unitsResult
                }
            }

            return {
                statusCode: 404,
                body: 'Info: Units not found.'
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting units.'
            }
        }
    }

}

export class GetUnitController implements IController {

    constructor(private readonly getUnitRepository: IGetUnitRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IUnitResponse>> {
        try {
            const unit: IUnitRequest | null = await this.getUnitRepository.getUnit(httpRequest.params.id);


            if (unit) {
                const unitsResponse: IUnitResponse = { ...unit, assets: mapAssets(unit.assets!) };

                return {
                    statusCode: 200,
                    body: unitsResponse
                }
            }

            return {
                statusCode: 404,
                body: 'Info: Unit not found.'
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting units.'
            }
        }
    }

}

export class GetAssetsUnitController implements IController {

    constructor(private readonly getUnitRepository: IGetUnitRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IAssetResponse[]>> {
        try {

            const unit: IUnitRequest | null = await this.getUnitRepository.getUnit(httpRequest.params.id);

            if (!unit) {
                throw new Error('Unit id not exists.');
            }

            const assets = unit.assets;

            if (!assets) {
                return {
                    statusCode: 404,
                    body: "Info: This Unit don't have assets."
                }
            }

            const assetsResult: IAssetResponse[] = assets.map(({ status, health, ...rest }) => ({ ...rest, status: statusEnum[status], health: `${health}%` }));


            return {
                statusCode: 200,
                body: assetsResult
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting assets of unit.'
            }
        }
    }

}