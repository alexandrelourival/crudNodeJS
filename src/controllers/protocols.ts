export interface HttpRequest<T> {
    params?: any;
    headers?: any;
    body?: T;
}
export interface HttpResponse<T> {
    statusCode: number;
    body?: T | string;
}