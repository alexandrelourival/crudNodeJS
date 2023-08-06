export interface IDeleteUnitRepository {
    updateUnit(id: string): Promise<void>;
}