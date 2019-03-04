import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('nest')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // localhost:3001/nest/hello
  @ApiExcludeEndpoint()
  @Get('hello')
  getHello(): any {
    return this.appService.getHello();
  }
}
