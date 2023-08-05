import { ObjectId } from "mongodb";
import { IGetCompaniesRepository, IGetUsersCompanyRepository, IGetCompanyRepository } from "../../controllers/company/getProtocols";
import { MongoClient } from "../../database/mongo";
import { ICompany } from "../../models/company";
import { IUser } from "../../models/user";


export class MongoGetCompaniesRepository implements IGetCompaniesRepository {
    async getCompanies(): Promise<ICompany[]> {
        const companies = await MongoClient.db.collection<ICompany>('companies').find({}).toArray();
        return companies;
    }
}

export class MongoGetCompanyRepository implements IGetCompanyRepository {
    async getCompany(id: string): Promise<ICompany | null> {
        const company = await MongoClient.db.collection<ICompany>('companies').findOne({ _id: new ObjectId(id) });
        return company;
    }
}

export class MongoGetUsersCompanyRepository implements IGetUsersCompanyRepository {
    async getUsers(id: string): Promise<IUser[]> {
        const company = await MongoClient.db.collection<ICompany>('companies').findOne({ _id: new ObjectId(id) });

        if (company != null) {
            const { users } = company;
            return users || [];
        }

        return [];
    }
}