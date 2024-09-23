import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalSchema } from './animal.schema';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
  exports: [MongooseModule],
})
export class AnimalModule {}
