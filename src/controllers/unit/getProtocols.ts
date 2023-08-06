import { IAssetResponse } from '../../models/asset';
import { IUnitRequest, IUnitResponse } from '../../models/unit';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IGetUnitsController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IUnitResponse[]>>;
}

export interface IGetUnitsRepository {
    getUnits(): Promise<IUnitRequest[]>;
}

export interface IGetUnitController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IUnitResponse>>;
}

export interface IGetUnitRepository {
    getUnit(id: string): Promise<IUnitRequest | null>;
}

export interface IGetAssetsUnitController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IAssetResponse[]>>;
}

