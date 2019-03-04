import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      success: 200,
      data : "Hello World ! "
    };
  }
}
