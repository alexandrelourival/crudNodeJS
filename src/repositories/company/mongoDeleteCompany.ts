import { ObjectId } from 'mongodb';
import { IDeleteCompanyRepository } from '../../controllers/company/deleteProtocols';
import { MongoClient } from '../../database/mongo';
import { ICompanyRequest } from '../../models/company';
import { IUnitRequest } from '../../models/unit';


export class MongoDeleteCompanyRepository implements IDeleteCompanyRepository {
    async updateCompany(id: string): Promise<void> {

        const company = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: new ObjectId(id) });

        if (!company) {
            throw new Error('Company not deleted.');
        }

        await MongoClient.db.collection<IUnitRequest>('units').deleteMany({ idCompany: id })

        const { acknowledged } = await MongoClient.db.collection<ICompanyRequest>('companies').deleteOne({ _id: new ObjectId(id) });

        if (!acknowledged) {
            throw new Error('Company not deleted.');
        }

    }
}