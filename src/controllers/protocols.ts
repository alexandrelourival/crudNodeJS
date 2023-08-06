/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest<T> {
    params?: any;
    headers?: any;
    body?: T;
}

export interface HttpResponse<T> {
    statusCode: number;
    body?: T | string;
}

export interface IController {
    handle(httpRequest?: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}