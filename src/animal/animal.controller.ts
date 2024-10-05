import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
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

  @Get(':id')
  @ApiOperation({ summary: 'Get an animal record by ID' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Animal record not found' })
  async findOne(@Param('id') id: string): Promise<Animal> {
    return this.animalService.findOne(id);
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
