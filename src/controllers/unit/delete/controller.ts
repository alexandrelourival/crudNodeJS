import { IDeleteUnitRepository } from './protocols';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { responseBadRequest, responseError, responseOk } from '../../helpers';

export class DeleteUnitController implements IController {

    constructor(private readonly updateUnitRepository: IDeleteUnitRepository) { }

    async handle(httpRequest: HttpRequest<void>): Promise<HttpResponse<string>> {

        try {
            if (!httpRequest.params.id) {
                return responseBadRequest('Missing unit id.');
            }

            await this.updateUnitRepository.updateUnit(httpRequest.params.id);

            return responseOk<string>('Unit and sub-categories was deleted.');
        } catch (error) {
            return responseError('Something went wrong when try delete unit.');
        }
    }

}