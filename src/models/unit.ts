import { ObjectId } from 'mongodb';
import { IAssetRequest, IAssetResponse } from './asset';

export interface IUnitRequest {
    _id?: ObjectId,
    idCompany: string,
    name: string,
    assets?: IAssetRequest[]
}

export interface IUnitResponse {
    _id?: ObjectId,
    idCompany: string,
    name: string,
    assets?: IAssetResponse[]
}