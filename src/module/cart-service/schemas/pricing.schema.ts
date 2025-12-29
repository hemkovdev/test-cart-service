import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DiscountBreakdown } from './nested/discount-breakdown';

@Schema({ _id: false })
export class Pricing {
  @Prop({ required: true }) unit_base_price: number;
  @Prop({ required: true }) item_total: number;
  @Prop({ default: 0 }) discount_amount: number;
  @Prop({ required: true, default: 0 }) tax_rate: number;
  @Prop({ default: 0 }) tax_amount: number;
  @Prop({ default: 0 }) final_price?: number;
  @Prop({ type: [DiscountBreakdown], default: [] }) discount_breakdown?: DiscountBreakdown;
}

export const PricingSchema = SchemaFactory.createForClass(Pricing);
export type PricingDocument = Pricing & Document;
