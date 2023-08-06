import { IAssetRequest, IAssetResponse } from '@/models/asset';
import { statusEnum } from './enum';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mapAssets = (assets?: IAssetRequest[]): IAssetResponse[] | undefined => {
    if (!assets) {
        return assets;
    }
    return assets.map(({ status, health, ...rest }) => ({ ...rest, status: statusEnum[status], health: `${health}%` }))
};

export const verifyRequiredParams = (body: any, requiredParams: string[]): boolean => {
    for (const param of requiredParams) {
        if (!(param in body)) {
            return false;
        }
    }
    return true;
};