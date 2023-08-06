import { IUser } from '@/models/user';
import { ICompanyRequest } from '../../../models/company';

export interface IPostCompanyRepository {
    postCompany(body: ICompanyRequest): Promise<void>;
}

export interface IPostUserCompanyRepository {
    postUser(id: string, user: IUser): Promise<void>;
}

