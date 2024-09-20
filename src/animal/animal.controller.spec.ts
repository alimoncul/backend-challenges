import { Test, TestingModule } from '@nestjs/testing';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './animal.dto';

const mockAnimal = {
  name: 'Lion',
  owner: 'John Doe',
  species: 'Panthera leo',
  birthYear: new Date('2015-01-01'),
};

describe('AnimalController', () => {
  let controller: AnimalController;
  let service: AnimalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalController],
      providers: [
        {
          provide: AnimalService,
          useValue: {
            createAnimal: jest.fn().mockResolvedValue(mockAnimal),
            findAll: jest.fn().mockResolvedValue([mockAnimal]),
          },
        },
      ],
    }).compile();

    controller = module.get<AnimalController>(AnimalController);
    service = module.get<AnimalService>(AnimalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an animal', async () => {
    const createAnimalDto: CreateAnimalDto = {
      name: 'Lion',
      owner: 'John Doe',
      species: 'Panthera leo',
      birthYear: new Date('2015-01-01'),
    };
    const result = await controller.createAnimal(createAnimalDto);
    expect(result).toEqual(mockAnimal);
    expect(service.createAnimal).toHaveBeenCalledWith(createAnimalDto);
  });

  it('should return all animals', async () => {
    const result = await controller.getAllAnimals();
    expect(result).toEqual([mockAnimal]);
    expect(service.findAll).toHaveBeenCalled();
  });
});
