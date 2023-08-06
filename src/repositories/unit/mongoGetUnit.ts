import { IUnitRequest } from "../../models/unit";
import { IGetUnitRepository, IGetUnitsRepository } from "../../controllers/unit/getProtocols";
import { MongoClient } from '../../database/mongo';
import { ObjectId } from "mongodb";

export class MongoGetUnitsRepository implements IGetUnitsRepository {
    async getUnits(): Promise<IUnitRequest[]> {
        const units = await MongoClient.db.collection<IUnitRequest>('units').find({}).toArray();
        return units;
    }
}

export class MongoGetUnitRepository implements IGetUnitRepository {
    async getUnit(id: string): Promise<IUnitRequest | null> {
        const unit = await MongoClient.db.collection<IUnitRequest>('units').findOne({ _id: new ObjectId(id) });
        return unit;
    }
}