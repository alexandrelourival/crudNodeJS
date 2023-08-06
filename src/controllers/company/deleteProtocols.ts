import { ICompanyResponse } from '../../models/company';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IDeleteCompanyController {
    handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<ICompanyResponse>>;
}

export interface IDeleteCompanyRepository {
    updateCompany(id: string): Promise<void>;
}