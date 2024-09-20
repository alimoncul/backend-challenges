import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Animal extends Document {
  @ApiProperty({ example: 'Leyla' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Alim Öncül' })
  @Prop({ required: true })
  owner: string;

  @ApiProperty({ example: 'Tabby' })
  @Prop({ required: true })
  species: string;

  @ApiProperty({ example: new Date() })
  @Prop()
  birthYear: Date;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
