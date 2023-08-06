import { IUnitResponse } from '../../models/unit';
import { mapAssets } from '../../utils/functions';
import { IUpdateUnitRepository, UpdateUnitParams } from './updateProtocols';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class UpdateUnitController implements IController {

    constructor(private readonly updateUnitRepository: IUpdateUnitRepository) { }

    async handle(httpRequest: HttpRequest<UpdateUnitParams>): Promise<HttpResponse<IUnitResponse>> {

        try {
            if (!httpRequest.params.id || !httpRequest.body) {
                return {
                    statusCode: 400,
                    body: "Info: Missing unit id or update body."
                }
            }

            const allowedFieldsToUpdate: (keyof UpdateUnitParams)[] = ['name'];

            const notAllowedFields = Object.keys(httpRequest.body).some(
                (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUnitParams)
            );

            if (notAllowedFields) {
                return {
                    statusCode: 400,
                    body: "Info: Just name and description are allowed to update."
                }
            }

            if (!httpRequest.body) {
                return {
                    statusCode: 400
                }
            }

            const unit = await this.updateUnitRepository.updateUnit(httpRequest.params.id, httpRequest.body);

            const unitsResponse: IUnitResponse = { ...unit, assets: mapAssets(unit.assets!) };
            return {
                statusCode: 200,
                body: unitsResponse
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting companies.'
            }
        }
    }

}