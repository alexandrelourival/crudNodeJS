import { IUser } from '../../../models/user';
import { ICompanyRequest } from '../../../models/company';

export interface IGetCompaniesRepository {
    getCompanies(): Promise<ICompanyRequest[]>;
}

export interface IGetCompanyRepository {
    getCompany(id: string): Promise<ICompanyRequest>;
}
export interface IGetUsersCompanyRepository {
    getUsers(id: string): Promise<IUser[]>;
}

