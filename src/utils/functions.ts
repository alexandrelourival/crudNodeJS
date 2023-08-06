import { IAssetRequest, IAssetResponse } from "@/models/asset";
import { statusEnum } from "./enum";

export const mapAssets = (assets?: IAssetRequest[]): IAssetResponse[] | undefined => {
    if (!assets) {
        return assets;
    }
    return assets.map(({ status, health, ...rest }) => ({ ...rest, status: statusEnum[status], health: `${health}%` }))
}

