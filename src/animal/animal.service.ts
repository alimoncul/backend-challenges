import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.schema';
import { CreateAnimalDto } from './animal.dto';

@Injectable()
export class AnimalService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async createAnimal(createAnimalBody: CreateAnimalDto): Promise<Animal> {
    return this.animalModel.create({ ...createAnimalBody });
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }
}
