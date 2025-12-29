import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Coordinates {
  @Prop() latitude?: string;
  @Prop() longitude?: string;
}

export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);
export type CoordinatesDocumnet = Coordinates & Document;
