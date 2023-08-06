import { IPostAssetUnitRepository, IPostUnitRepository } from "../../controllers/unit/postProtocols";
import { MongoClient } from "../../database/mongo";
import { IAssetRequest } from "../../models/asset";
import { ICompanyRequest } from "../../models/company";
import { IUnitRequest } from "../../models/unit";

export class MongoPostUnitRepository implements IPostUnitRepository {
    async postUnit(company: ICompanyRequest, unit: IUnitRequest): Promise<void> {

        if (company.units) {
            company.units.push(unit);
        } else {
            company.units = [unit];
        }

        await MongoClient.db.collection<ICompanyRequest>('companies').updateOne({ _id: company._id }, { $set: company });

        try {
            await MongoClient.db.collection<IUnitRequest>('units').insertOne(unit);
        } catch (error) {
            company.units.pop();
            await MongoClient.db.collection<ICompanyRequest>('companies').updateOne({ _id: company._id }, { $set: company });
            throw error;
        }
    }
}

export class MongoPostAssetUnitRepository implements IPostAssetUnitRepository {
    async postAsset(company: ICompanyRequest, unit: IUnitRequest, asset: IAssetRequest): Promise<void> {

        if (unit.assets) {
            unit.assets.push(asset);
        } else {
            unit.assets = [asset];
        }

        company.units!.forEach((unitForEach, index) => {
            if (unitForEach.idCompany == unit.idCompany && unitForEach.name == unit.name) {
                company.units![index] = unit;
            }
        });

        await MongoClient.db.collection<ICompanyRequest>('companies').updateOne({ _id: company._id }, { $set: company });

        await MongoClient.db.collection<IUnitRequest>('units').updateOne({ _id: unit._id }, { $set: unit });
    }
}