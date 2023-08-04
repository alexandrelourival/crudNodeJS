import { IGetCompaniesRepository } from "@/controllers/company/protocols";
import { MongoClient } from "../../database/mongo";
import { Company } from "../../models/company";

export class MongoGetCompaniesRepository implements IGetCompaniesRepository {
    async getCompanies(): Promise<Company[]> {
        const companies = await MongoClient.db.collection<Omit<Company, 'id'>>('companies').find({}).toArray();
        return companies.map(({ _id, ...rest }) => ({ id: _id.toHexString(), ...rest }));
    }
}