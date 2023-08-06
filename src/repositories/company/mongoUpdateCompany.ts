import { ObjectId } from 'mongodb';
import { IUpdateCompanyRepository, UpdateCompanyParams } from '../../controllers/company/updateProtocols';
import { MongoClient } from '../../database/mongo';
import { ICompanyRequest } from '../../models/company';


export class MongoUpdateCompanyRepository implements IUpdateCompanyRepository {
    async updateCompany(id: string, params: UpdateCompanyParams): Promise<ICompanyRequest> {

        await MongoClient.db.collection<ICompanyRequest>('companies').updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

        const company = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: new ObjectId(id) })

        if (!company) {
            throw new Error('User not updated');
        }

        return company;
    }
}