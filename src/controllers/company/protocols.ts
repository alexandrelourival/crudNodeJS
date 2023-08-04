import { Company } from "../../models/company";
import { HttpResponse } from "../protocols";

export interface IGetCompaniesController {
    handle(): Promise<HttpResponse<Company[]>>;
}

export interface IGetCompaniesRepository {
    getCompanies(): Promise<Company[]>;
}