import { IUnitResponse } from '../../models/unit';
import { HttpRequest, HttpResponse } from '../protocols';

export interface IDeleteUnitController {
    handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<IUnitResponse>>;
}

export interface IDeleteUnitRepository {
    updateUnit(id: string): Promise<void>;
}