import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.schema';

@Injectable()
export class AnimalService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async createAnimal(createAnimalBody: Animal): Promise<Animal> {
    const createdAnimal = new this.animalModel({ ...createAnimalBody });
    return createdAnimal.save();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }
}
