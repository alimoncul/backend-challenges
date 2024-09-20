import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsDateString } from 'class-validator';

export class CreateAnimalDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({ example: 'Leyla' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({ example: 'Alim Öncül' })
  owner: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({ example: 'Tabby' })
  species: string;

  @IsDateString()
  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  birthYear: Date;
}
