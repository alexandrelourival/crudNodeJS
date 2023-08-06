import { IAssetRequest } from '@/models/asset';
import { IUnitRequest } from '../../../models/unit';
import { ICompanyRequest } from '../../../models/company';

export interface IPostUnitRepository {
    postUnit(company: ICompanyRequest, unit: IUnitRequest): Promise<void>;
}

export interface IPostAssetUnitRepository {
    postAsset(unit: IUnitRequest, asset: IAssetRequest): Promise<void>;
}