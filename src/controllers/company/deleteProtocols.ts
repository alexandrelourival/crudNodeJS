export interface IDeleteCompanyRepository {
    updateCompany(id: string): Promise<void>;
}