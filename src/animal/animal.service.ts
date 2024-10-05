import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Animal } from './animal.schema';
import { CreateAnimalDto } from './animal.dto';

@Injectable()
export class AnimalService {
  constructor(@InjectModel('Animal') private animalModel: Model<Animal>) {}

  async createAnimal(createAnimalBody: CreateAnimalDto): Promise<Animal> {
    return this.animalModel.create({ ...createAnimalBody });
  }

  async deleteAll(): Promise<void> {
    await this.animalModel.deleteMany().exec();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async findOne(id: string): Promise<Animal> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid animal ID.');
    }

    const result = await this.animalModel.findById(id).exec();

    if (result === null) {
      throw new NotFoundException('Animal record not found.');
    }

    return result;
  }
}
