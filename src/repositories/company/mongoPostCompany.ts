import { ObjectId } from 'mongodb';
import { IPostUserCompanyRepository, IPostCompanyRepository } from '../../controllers/company/post/protocols';
import { MongoClient } from '../../database/mongo';
import { ICompanyRequest } from '../../models/company';
import { IUser } from '../../models/user';


export class MongoPostCompanyRepository implements IPostCompanyRepository {
    async postCompany(company: ICompanyRequest): Promise<void> {
        const { insertedId } = await MongoClient.db.collection<ICompanyRequest>('companies').insertOne(company);

        const companyResult = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: insertedId });

        if (!companyResult) {
            throw new Error('Company not created.');
        }
    }
}

export class MongoPostUserCompanyRepository implements IPostUserCompanyRepository {
    async postUser(id: string, user: IUser): Promise<void> {
        const company = await MongoClient.db.collection<Omit<ICompanyRequest, '_id'>>('companies').findOne({ _id: new ObjectId(id) });

        if (!company) {
            throw new Error('User not created.');
        }

        if (!company.users) {
            company.users = [user];
        }
        else {
            company.users.push(user);
        }

        await MongoClient.db.collection<ICompanyRequest>('companies').updateOne({ _id: new ObjectId(id) }, { $set: company });

        const companyResult = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: new ObjectId(id) });

        if (!companyResult) {
            throw new Error('User not created.');
        }
    }
}