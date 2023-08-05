import { IUser } from "@/models/user";
import { ICompany } from "../../models/company";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IPostCompanyController {
    handle(httpRequest: HttpRequest<ICompany>): Promise<HttpResponse<ICompany>>;
}

export interface IPostCompanyRepository {
    postCompany(body: ICompany): Promise<ICompany>;
}

export interface IPostUserCompanyController {
    handle(id: string, httpRequest: HttpRequest<IUser>): Promise<HttpResponse<null>>;
}

export interface IPostUserCompanyRepository {
    postUser(id: string, user: IUser): Promise<void>;
}

