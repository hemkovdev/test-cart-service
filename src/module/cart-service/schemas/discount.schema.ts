import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DiscountType } from '../enums';

@Schema({ _id: false })
export class Discount {
  @Prop({ type: String, required: true, enum: DiscountType })
  type: DiscountType;
  @Prop({ required: false }) promo_code?: string;
  @Prop({ required: false }) promotion_id?: string;
  @Prop({ required: true }) discount_amount: number;
  @Prop() last_synced_at?: Date;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
export type DiscountDocument = Discount & Document;
