import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class DiscountBreakdown {
  @Prop({ enum: ['OFFER', 'WAVECOIN', 'PROMO', 'COMBO', 'SUBSCRIPTION'] })
  discount_type: string;
  @Prop() promotion_id?: string;
  @Prop({ required: true }) discount_amount: number;
  @Prop({ default: Date.now }) applied_at: Date;
}

export const DiscountBreakdownSchema =
  SchemaFactory.createForClass(DiscountBreakdown);
export type DiscountBreakdownDocument = DiscountBreakdown & Document;
