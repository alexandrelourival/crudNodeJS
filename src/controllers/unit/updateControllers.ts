import { IUnitResponse } from '../../models/unit';
import { mapAssets } from '../../utils/functions';
import { IUpdateUnitController, IUpdateUnitRepository, UpdateUnitParams } from './updateProtocols';
import { HttpRequest } from '../protocols';

export class UpdateUnitController implements IUpdateUnitController {

    constructor(private readonly updateUnitRepository: IUpdateUnitRepository) { }

    async handle(httpRequest: HttpRequest<UpdateUnitParams>) {

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

            if (unit) {
                const unitsResponse: IUnitResponse = { ...unit, assets: mapAssets(unit.assets!) };
                return {
                    statusCode: 200,
                    body: unitsResponse
                }
            };

            return {
                statusCode: 404,
                body: 'Info: Unit not found.'
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting companies.'
            }
        }
    }

}