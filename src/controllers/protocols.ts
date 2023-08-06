/* eslint-disable @typescript-eslint/no-explicit-any */
export enum HttpStatuscode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    ERROR = 500
}

export interface HttpRequest<T> {
    params?: any;
    headers?: any;
    body?: T;
}

export interface HttpResponse<T> {
    statusCode: HttpStatuscode;
    body?: T;
}

export interface IController {
    handle(httpRequest?: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}