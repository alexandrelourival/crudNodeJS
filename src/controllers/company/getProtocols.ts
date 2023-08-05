import { IUser } from "@/models/user";
import { ICompany } from "../../models/company";
import { HttpResponse } from "../protocols";

export interface IGetCompaniesController {
    handle(): Promise<HttpResponse<ICompany[]>>;
}

export interface IGetCompaniesRepository {
    getCompanies(): Promise<ICompany[]>;
}

export interface IGetCompanyController {
    handle(id: string): Promise<HttpResponse<ICompany>>;
}

export interface IGetCompanyRepository {
    getCompany(id: string): Promise<ICompany | null>;
}

export interface IGetUsersCompanyController {
    handle(id: string): Promise<HttpResponse<IUser[]>>;
}

export interface IGetUsersCompanyRepository {
    getUsers(id: string): Promise<IUser[]>;
}

