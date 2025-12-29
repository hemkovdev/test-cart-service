import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderType_Enum } from '../enums';
import { Image } from './nested/image.schema';

@Schema({ _id: false })
export class OrderType {
  @Prop({ type: String, enum: OrderType_Enum }) order_type: OrderType_Enum;
  @Prop({ required: true }) title: string;
  @Prop() subtitle?: string;
  @Prop({ type: Image }) image?: Image;
  @Prop({ default: false }) is_enabled: boolean;
  @Prop({ default: false }) is_new: boolean;
  @Prop({ default: false }) is_selected: boolean;
  @Prop({ type: [String], default: [] }) table_list?: string[];
  @Prop() table_number?: string;
  @Prop() min_order_value?: number;
  @Prop() delivery_charge?: number;
  @Prop() eta_range?: string;
  @Prop() last_sunced_at?: Date;
}

export const OrderTypeSchema = SchemaFactory.createForClass(OrderType);
export type OrderTypeDocument = OrderType & Document;
