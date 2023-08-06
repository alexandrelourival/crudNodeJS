import { IUser } from '@/models/user';
import { ICompanyRequest, ICompanyResponse } from '../../models/company';
import { HttpResponse } from '../protocols';

export interface IGetCompaniesController {
    handle(): Promise<HttpResponse<ICompanyResponse[]>>;
}

export interface IGetCompaniesRepository {
    getCompanies(): Promise<ICompanyRequest[]>;
}

export interface IGetCompanyController {
    handle(id: string): Promise<HttpResponse<ICompanyResponse>>;
}

export interface IGetCompanyRepository {
    getCompany(id: string): Promise<ICompanyRequest | null>;
}

export interface IGetUsersCompanyController {
    handle(id: string): Promise<HttpResponse<IUser[]>>;
}

export interface IGetUsersCompanyRepository {
    getUsers(id: string): Promise<IUser[]>;
}

