import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VeterinarySchema } from './veterinary.schema';
import { VeterinaryService } from './veterinary.service';
import { VeterinaryController } from './veterinary.controller';
import { AnimalModule } from 'src/animal/animal.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Veterinary', schema: VeterinarySchema },
    ]),
    AnimalModule,
  ],
  controllers: [VeterinaryController],
  providers: [VeterinaryService],
})
export class VeterinaryModule {}
