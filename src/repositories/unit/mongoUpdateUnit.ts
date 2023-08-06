import { ObjectId } from 'mongodb';
import { IUpdateUnitRepository, UpdateUnitParams } from '../../controllers/unit/updateProtocols';
import { MongoClient } from '../../database/mongo';
import { IUnitRequest } from '../../models/unit';
import { ICompanyRequest } from '@/models/company';


export class MongoUpdateUnitRepository implements IUpdateUnitRepository {
    async updateUnit(id: string, params: UpdateUnitParams): Promise<IUnitRequest> {

        const unitBefore = await MongoClient.db.collection<IUnitRequest>('units').findOne({ _id: new ObjectId(id) })

        await MongoClient.db.collection<IUnitRequest>('units').updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

        const unit = await MongoClient.db.collection<IUnitRequest>('units').findOne({ _id: new ObjectId(id) })

        if (!unit) {
            throw new Error('User not updated');
        }

        const company = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: new ObjectId(unit.idCompany) });

        company!.units!.forEach((_unitForEach, index) => {
            if (company!._id.toHexString() == unit.idCompany) {
                company!.units![index] = unit;
            }
        });

        const companyUpdate = await MongoClient.db.collection<ICompanyRequest>('companies').updateOne({ _id: new ObjectId(unit.idCompany) }, { $set: { ...company } });
        if (!companyUpdate) {
            await MongoClient.db.collection<IUnitRequest>('units').updateOne({ _id: new ObjectId(id) }, { $set: { ...unitBefore } });
            throw new Error('User not updated');
        }

        return unit;
    }
}