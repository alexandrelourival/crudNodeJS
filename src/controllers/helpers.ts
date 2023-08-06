import { HttpResponse, HttpStatuscode } from "./protocols";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const responseOk = <T>(body: any): HttpResponse<T> => { return { statusCode: HttpStatuscode.OK, body } };
export const responseCreated = (): HttpResponse<string> => { return { statusCode: HttpStatuscode.CREATED } };
export const responseBadRequest = (msg: string): HttpResponse<string> => { return { statusCode: HttpStatuscode.BAD_REQUEST, body: `Warning: ${msg}` } };
export const responseNotFound = (msg: string): HttpResponse<string> => { return { statusCode: HttpStatuscode.NOT_FOUND, body: `Info: ${msg}` } }
export const responseError = (msg: string): HttpResponse<string> => { return { statusCode: HttpStatuscode.ERROR, body: `Error: ${msg}` } }