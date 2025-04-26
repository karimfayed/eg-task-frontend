export interface HttpResponse<T = unknown> {
    statusCode: number;
    body: HttpResponseBody<T>;
}

export interface HttpResponseBody<T = unknown> {
    message: string;
    result?: T;
}

export  interface ErrorWithResponse<T = unknown> {
    data?: HttpResponse<T>;
}