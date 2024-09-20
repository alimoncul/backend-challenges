import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimalService } from './animal.service';
import { Animal } from './animal.schema';

@ApiTags('animals')
@Controller('animals')
export class AnimalController {
  private readonly logger = new Logger(AnimalController.name);

  constructor(private readonly animalService: AnimalService) {}

  @Get()
  @ApiOperation({ summary: 'Get all animals' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getAllAnimals(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Post()
  @ApiBody({ type: Animal })
  @ApiOperation({ summary: 'Create a new animal' })
  @ApiResponse({ status: 201, description: 'Animal created successfully' })
  async createAnimal(@Body() createAnimalBody: Animal): Promise<Animal> {
    return this.animalService.createAnimal(createAnimalBody);
  }
}
