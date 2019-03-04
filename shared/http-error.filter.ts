import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';
import {response} from "express";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest();
        const response = context.getResponse();
        const httpStatusCode = exception.getStatus();

        const errorResponse = {
            code: httpStatusCode,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null,
        };

        Logger.error(`${request.method} ${request.url}`,
            JSON.stringify(errorResponse),
            'ExceptionFilter');


        response.status(httpStatusCode).json(errorResponse);
    }
}