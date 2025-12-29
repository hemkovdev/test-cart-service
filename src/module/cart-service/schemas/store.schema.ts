import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderType } from './order-type.schema';
import { StoreLocation } from './nested/store-location.schema';

@Schema({ _id: false })
export class Store {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) name?: string;
  @Prop({ type: StoreLocation }) location?: StoreLocation;
  @Prop({ type: [OrderType], default: [] }) order_types?: OrderType[];
  @Prop({ default: false }) is_active?: boolean;
  @Prop() last_synced_at?: Date;
}

export const storeSchema = SchemaFactory.createForClass(Store);
export type StoreDocument = Store & Document;
