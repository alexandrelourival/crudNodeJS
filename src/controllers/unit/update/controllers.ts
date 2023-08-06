import { IUnitResponse } from '../../../models/unit';
import { mapAssets } from '../../../utils/functions';
import { IUpdateUnitRepository, UpdateUnitParams } from './protocols';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { responseBadRequest, responseError, responseOk } from '../../helpers';

export class UpdateUnitController implements IController {

    constructor(private readonly updateUnitRepository: IUpdateUnitRepository) { }

    async handle(httpRequest: HttpRequest<UpdateUnitParams>): Promise<HttpResponse<IUnitResponse | string>> {

        try {
            if (!httpRequest.params.id || !httpRequest.body) {
                return responseBadRequest('Missing unit id or update body.');
            }

            const allowedFieldsToUpdate: (keyof UpdateUnitParams)[] = ['name'];

            const notAllowedFields = Object.keys(httpRequest.body).some(
                (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUnitParams)
            );

            if (notAllowedFields) {
                return responseBadRequest('Just name and description are allowed to update.');
            }

            const unit = await this.updateUnitRepository.updateUnit(httpRequest.params.id, httpRequest.body);

            const unitResponse: IUnitResponse = { ...unit, assets: mapAssets(unit.assets!) };

            return responseOk<IUnitResponse>(unitResponse);
        } catch (error) {
            return responseError('Something went wrong when try update unit.');
        }
    }

}