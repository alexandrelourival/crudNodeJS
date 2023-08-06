import { IUnitRequest } from '../../../models/unit';

export interface IGetUnitsRepository {
    getUnits(): Promise<IUnitRequest[]>;
}

export interface IGetUnitRepository {
    getUnit(id: string): Promise<IUnitRequest>;
}