import { IDeleteUnitController, IDeleteUnitRepository } from './deleteProtocols';
import { HttpRequest } from '../protocols';

export class DeleteUnitController implements IDeleteUnitController {

    constructor(private readonly updateUnitRepository: IDeleteUnitRepository) { }

    async handle(httpRequest: HttpRequest<void>) {

        try {
            if (!httpRequest.params.id) {
                return {
                    statusCode: 400,
                    body: "Info: Missing unit id."
                }
            }

            await this.updateUnitRepository.updateUnit(httpRequest.params.id);

            return {
                statusCode: 200,
                body: 'Info: Unit and sub-categories was deleted.'
            }

        } catch (error) {
            return {
                statusCode: 500,
                body: 'Error: Something went wrong when getting companies.'
            }
        }
    }

}