import { IUnitRequest, IUnitResponse } from '../../models/unit';
import { HttpRequest, HttpResponse } from '../protocols';

export interface UpdateUnitParams {
    name?: string
}

export interface IUpdateUnitController {
    handle(httpRequest: HttpRequest<UpdateUnitParams>): Promise<HttpResponse<IUnitResponse>>;
}

export interface IUpdateUnitRepository {
    updateUnit(id: string, params: UpdateUnitParams): Promise<IUnitRequest | null>;
}