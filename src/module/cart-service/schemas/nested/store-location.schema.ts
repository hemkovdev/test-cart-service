import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Coordinates } from './coordinates.schema';

@Schema({ _id: false })
export class StoreLocation {
  @Prop() address?: string;
  @Prop() city?: string;
  @Prop({ type: Coordinates }) coordinates?: Coordinates;
}

export const StoreLocationSchema = SchemaFactory.createForClass(StoreLocation);
export type StoreLocationDocument = StoreLocation & Document;
