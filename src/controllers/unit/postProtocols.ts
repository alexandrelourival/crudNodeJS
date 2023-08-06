import { IAssetRequest } from '@/models/asset';
import { IUnitRequest } from '../../models/unit';
import { ICompanyRequest } from '../../models/company';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IPostUnitController {
    handle(httpRequest: HttpRequest<IUnitRequest>): Promise<HttpResponse<IUnitRequest>>;
}

export interface IPostUnitRepository {
    postUnit(company: ICompanyRequest, unit: IUnitRequest): Promise<void>;
}

export interface IPostAssetUnitController {
    handle(httpRequest: HttpRequest<IAssetRequest>): Promise<HttpResponse<null>>;
}

export interface IPostAssetUnitRepository {
    postAsset(unit: IUnitRequest, asset: IAssetRequest): Promise<void>;
}

