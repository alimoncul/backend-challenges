import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimalService } from './animal.service';
import { Animal } from './animal.schema';
import { CreateAnimalDto } from './animal.dto';

@ApiTags('animals')
@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  @ApiOperation({ summary: 'Get all animals' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getAllAnimals(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateAnimalDto })
  @ApiOperation({ summary: 'Create a new animal' })
  @ApiResponse({ status: 201, description: 'Animal created successfully' })
  async createAnimal(
    @Body() createAnimalBody: CreateAnimalDto,
  ): Promise<Animal> {
    return this.animalService.createAnimal(createAnimalBody);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletes all animals in the database' })
  @ApiResponse({ status: 200, description: 'All animals deleted' })
  async deleteAllAnimals(): Promise<void> {
    return this.animalService.deleteAll();
  }
}
