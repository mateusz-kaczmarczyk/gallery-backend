import 'reflect-metadata';
import express, { Express, json } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setupGlobalValidationPipe } from './validation.pipe';
import { useContainer } from 'class-validator';
import { ResponseWrapper } from './common/interceptor/response-wrapper.interceptor';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';
const dotenv = require('dotenv-yaml');

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Gallery API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  await dotenv.config();
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();
  const expressServer: Express = express();
  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressServer),
    { cors: true },
  );
  nestApp.use(json({ limit: '16mb' }));
  nestApp.setGlobalPrefix('api');
  nestApp.useGlobalInterceptors(new ResponseWrapper());
  nestApp.useGlobalPipes(setupGlobalValidationPipe());
  useContainer(nestApp.select(AppModule), { fallbackOnErrors: true });
  setupSwagger(nestApp);
  await nestApp.listen(process.env.APP_PORT, 'localhost');
  console.log(`Application is running on: ${await nestApp.getUrl()}`);
  console.log(`Documentation is available at: ${await nestApp.getUrl()}/docs`);
}
bootstrap();