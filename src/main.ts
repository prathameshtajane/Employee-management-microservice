import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';
import {Logger} from '@nestjs/common';

const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
      .setTitle('Employee Management Microservice')
      .setDescription('Employee Management Microservice built using NestJs')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`,"Bootstrap");
  Logger.log(`Swagger UI running on http://localhost:${port}/doc`,"Bootstrap");
}
bootstrap();
