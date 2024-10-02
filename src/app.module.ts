import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricController } from './metric/metric.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalModule } from './animal/animal.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VeterinaryModule } from './veterinary/veterinary.module';
import { ResourceController } from './resource/resource.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AnimalModule,
    VeterinaryModule,
  ],
  controllers: [AppController, MetricController, ResourceController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
