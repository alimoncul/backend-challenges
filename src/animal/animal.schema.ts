import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Animal extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  species: string;

  @Prop()
  birthYear: Date;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
