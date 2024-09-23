import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateVeterinaryDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({ example: ['66f12e24cecab8e7eff7ff97'] })
  animals: Types.ObjectId[]; // Array of Animal IDs

  @IsDateString()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  date: string;

  @IsString()
  @ApiProperty({ example: 'Routine wellness examination' })
  description: string;
}
