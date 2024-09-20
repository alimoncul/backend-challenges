import { Test, TestingModule } from '@nestjs/testing';
import { AnimalService } from './animal.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './animal.schema';
import { CreateAnimalDto } from './animal.dto';

const mockAnimal = {
  name: 'Lion',
  owner: 'John Doe',
  species: 'Panthera leo',
  birthYear: new Date('2015-01-01'),
};

const mockAnimalModel = {
  create: jest.fn().mockResolvedValue(mockAnimal), // Mock create method
  find: jest.fn().mockReturnThis(), // find should return the model itself
  exec: jest.fn().mockResolvedValue([mockAnimal]), // exec should resolve to the mock animal array
};

describe('AnimalService', () => {
  let service: AnimalService;
  let model: Model<Animal>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalService,
        {
          provide: getModelToken(Animal.name),
          useValue: mockAnimalModel,
        },
      ],
    }).compile();

    service = module.get<AnimalService>(AnimalService);
    model = module.get<Model<Animal>>(getModelToken(Animal.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an animal', async () => {
    const createAnimalDto: CreateAnimalDto = { ...mockAnimal };
    const createdAnimal = await service.createAnimal(createAnimalDto);
    expect(model.create).toHaveBeenCalledWith(createAnimalDto); // Ensure the create method was called correctly
    expect(createdAnimal).toEqual(mockAnimal);
  });

  it('should return all animals', async () => {
    const animals = await service.findAll();
    expect(model.find).toHaveBeenCalled(); // Ensure find was called
    expect(animals).toEqual([mockAnimal]);
  });
});
