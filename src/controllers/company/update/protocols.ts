import { ICompanyRequest } from '../../../models/company';

export interface UpdateCompanyParams {
    name?: string,
    description?: string
}

export interface IUpdateCompanyRepository {
    updateCompany(id: string, params: UpdateCompanyParams): Promise<ICompanyRequest>;
}