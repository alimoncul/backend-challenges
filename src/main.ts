import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MetricsInterceptor } from './metrics/metrics.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/logger.config';
import * as packageJSON from '../package.json';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Apply the MetricsInterceptor globally
  app.useGlobalInterceptors(new MetricsInterceptor());

  const config = new DocumentBuilder()
    .setTitle(packageJSON.name)
    .setDescription(`by ${packageJSON.author}`)
    .setVersion(packageJSON.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
