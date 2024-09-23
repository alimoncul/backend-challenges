import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema()
export class Veterinary extends Document {
  @Prop({
    type: [{ type: mongoose.Schema.ObjectId, ref: 'Animal' }],
    required: true,
  })
  animals: Types.ObjectId[];

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;
}

export const VeterinarySchema = SchemaFactory.createForClass(Veterinary);
