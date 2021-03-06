import {ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>):
        Observable<any> {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const now = Date.now();

        return call$.pipe(
            tap(() => Logger.log(
                `${request.method} ${request.url} ${Date.now() - now}ms`,
                context.getClass().name,)
            )
        );
    }
}