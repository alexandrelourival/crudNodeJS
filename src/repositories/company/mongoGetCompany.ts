import { ObjectId } from 'mongodb';
import { IGetCompaniesRepository, IGetUsersCompanyRepository, IGetCompanyRepository } from '../../controllers/company/get/protocols';
import { MongoClient } from '../../database/mongo';
import { ICompanyRequest } from '../../models/company';
import { IUser } from '../../models/user';


export class MongoGetCompaniesRepository implements IGetCompaniesRepository {
    async getCompanies(): Promise<ICompanyRequest[]> {
        const companies = await MongoClient.db.collection<ICompanyRequest>('companies').find({}).toArray();

        return companies;
    }
}

export class MongoGetCompanyRepository implements IGetCompanyRepository {
    async getCompany(id: string): Promise<ICompanyRequest> {
        const company = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: new ObjectId(id) });

        if (!company) {
            throw new Error('Company id not exist');
        }

        return company;
    }
}

export class MongoGetUsersCompanyRepository implements IGetUsersCompanyRepository {
    async getUsers(id: string): Promise<IUser[]> {
        const company = await MongoClient.db.collection<ICompanyRequest>('companies').findOne({ _id: new ObjectId(id) });

        if (company != null) {
            const { users } = company;
            return users || [];
        }

        return [];
    }
}