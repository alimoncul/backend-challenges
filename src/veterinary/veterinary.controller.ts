import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VeterinaryService } from './veterinary.service';
import { CreateVeterinaryDto } from './veterinary.dto';
import { Veterinary } from './veterinary.schema';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('veterinaries')
@Controller('veterinaries')
export class VeterinaryController {
  constructor(private readonly veterinaryService: VeterinaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all veterinary records' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll(): Promise<Veterinary[]> {
    return this.veterinaryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a veterinary record by ID' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Veterinary record not found' })
  async findOne(@Param('id') id: string): Promise<Veterinary> {
    return this.veterinaryService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateVeterinaryDto })
  @ApiOperation({ summary: 'Create a new veterinary record' })
  @ApiResponse({
    status: 201,
    description: 'Veterinary record created successfully',
  })
  async create(
    @Body() createVeterinaryDto: CreateVeterinaryDto,
  ): Promise<Veterinary> {
    return this.veterinaryService.create(createVeterinaryDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deletes all veterinary records in the database' })
  @ApiResponse({ status: 200, description: 'All veterinary records deleted' })
  async deleteAll(): Promise<void> {
    return this.veterinaryService.deleteAll();
  }
}
