import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Veterinary } from './veterinary.schema';
import { CreateVeterinaryDto } from './veterinary.dto';
import { Animal } from '../animal/animal.schema';

@Injectable()
export class VeterinaryService {
  constructor(
    @InjectModel('Veterinary') private veterinaryModel: Model<Veterinary>,
    @InjectModel('Animal') private animalModel: Model<Animal>,
  ) {}

  async create(createVeterinaryDto: CreateVeterinaryDto): Promise<Veterinary> {
    await this.validateAnimalIds(createVeterinaryDto.animals);
    return this.veterinaryModel.create({ ...createVeterinaryDto });
  }

  async findAll(): Promise<Veterinary[]> {
    return this.veterinaryModel.find().populate('animals').exec();
  }

  async findOne(id: string): Promise<Veterinary> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid veterinary ID.');
    }

    const result = await this.veterinaryModel
      .findById(id)
      .populate('animals')
      .exec();

    if (result === null) {
      throw new NotFoundException('Veterinary record not found.');
    }

    return result;
  }

  async deleteAll(): Promise<void> {
    await this.veterinaryModel.deleteMany().exec();
  }

  private async validateAnimalIds(animalIds: Types.ObjectId[]): Promise<void> {
    const invalidAnimalIds = animalIds.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id),
    );

    if (invalidAnimalIds.length > 0) {
      throw new BadRequestException('One or more animal IDs are invalid.');
    }

    const animals = await this.animalModel
      .find({ _id: { $in: animalIds } })
      .exec();

    if (animals.length !== animalIds.length) {
      throw new BadRequestException('One or more animal IDs are invalid.');
    }
  }
}
