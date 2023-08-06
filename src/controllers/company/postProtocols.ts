import { IUser } from '@/models/user';
import { ICompanyRequest, ICompanyResponse } from '../../models/company';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IPostCompanyController {
    handle(httpRequest: HttpRequest<ICompanyRequest>): Promise<HttpResponse<ICompanyResponse>>;
}

export interface IPostCompanyRepository {
    postCompany(body: ICompanyRequest): Promise<ICompanyRequest>;
}

export interface IPostUserCompanyController {
    handle(httpRequest: HttpRequest<IUser>): Promise<HttpResponse<null>>;
}

export interface IPostUserCompanyRepository {
    postUser(id: string, user: IUser): Promise<void>;
}

