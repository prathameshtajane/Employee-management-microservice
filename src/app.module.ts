import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import {EmployeeModule} from "./employee/employee.module";

import {HttpErrorFilter} from "../shared/http-error.filter";
import {LoggingInterceptor} from "../shared/logging.interceptor";

@Module({
    imports: [TypeOrmModule.forRoot(), EmployeeModule],//this is to import modules
    controllers: [AppController], // this are all the controllers
    providers: [AppService,
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter
        },
        {
          provide:APP_INTERCEPTOR,
          useClass:LoggingInterceptor
        }], //these are all the injectables
})
export class AppModule {
}
