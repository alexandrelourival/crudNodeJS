import { ObjectId } from 'mongodb';
import { IDeleteUnitRepository } from '../../controllers/unit/delete/protocols';
import { MongoClient } from '../../database/mongo';
import { IUnitRequest } from '../../models/unit';
import { ICompanyRequest } from '@/models/company';


export class MongoDeleteUnitRepository implements IDeleteUnitRepository {
    async updateUnit(id: string): Promise<void> {

        const unit = await MongoClient.db.collection<IUnitRequest>('units').findOne({ _id: new ObjectId(id) });

        const { acknowledged } = await MongoClient.db.collection<IUnitRequest>('units').deleteOne({ _id: new ObjectId(id) });

        if (!acknowledged) {
            throw Error('Unit not deleted.');
        }
        const company = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: new ObjectId(unit!.idCompany) });

        company!.units = company!.units!.filter((unitFilter) => ((unitFilter.idCompany != unit!.idCompany) || (unitFilter.name != unit!.name)));

        await MongoClient.db.collection<ICompanyRequest>('companies').updateOne({ _id: new ObjectId(unit!.idCompany) }, { $set: company! });
    }
}