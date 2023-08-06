import { IUnitRequest } from '../../../models/unit';

export interface UpdateUnitParams {
    name?: string
}

export interface IUpdateUnitRepository {
    updateUnit(id: string, params: UpdateUnitParams): Promise<IUnitRequest>;
}