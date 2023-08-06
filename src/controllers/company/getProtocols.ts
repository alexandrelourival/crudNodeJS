import { IUser } from '@/models/user';
import { ICompanyRequest, ICompanyResponse } from '../../models/company';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IGetCompaniesController {
    handle(): Promise<HttpResponse<ICompanyResponse[]>>;
}

export interface IGetCompaniesRepository {
    getCompanies(): Promise<ICompanyRequest[]>;
}

export interface IGetCompanyController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<ICompanyResponse>>;
}

export interface IGetCompanyRepository {
    getCompany(id: string): Promise<ICompanyRequest | null>;
}

export interface IGetUsersCompanyController {
    handle(httpRequest: HttpRequest<null>): Promise<HttpResponse<IUser[]>>;
}

export interface IGetUsersCompanyRepository {
    getUsers(id: string): Promise<IUser[]>;
}

