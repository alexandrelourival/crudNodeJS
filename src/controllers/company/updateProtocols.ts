import { ICompanyRequest, ICompanyResponse } from '../../models/company';
import { HttpRequest, HttpResponse } from '../protocols';

export interface UpdateCompanyParams {
    name?: string,
    description?: string
}

export interface IUpdateCompanyController {
    handle(httpRequest: HttpRequest<UpdateCompanyParams>): Promise<HttpResponse<ICompanyResponse>>;
}

export interface IUpdateCompanyRepository {
    updateCompany(id: string, params: UpdateCompanyParams): Promise<ICompanyRequest | null>;
}