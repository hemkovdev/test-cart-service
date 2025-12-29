import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class SubscriptionRedemption {
  @Prop() id?: string;
  @Prop() user_subscription_id?: string;
  @Prop() subscription_id?: string;
  @Prop() subscription_title?: string;
  @Prop() total_quantity?: number;
  @Prop() used_quantity?: number;
  @Prop() remaining_quantity?: number;
  @Prop({ default: true }) is_applied: boolean;
  @Prop() unit_price?: number;
  @Prop() voucher_code?: string;
}

export const SubscriptionRedemptionSchema = SchemaFactory.createForClass(
  SubscriptionRedemption,
);
export type SubscriptionRedemptionDocument = SubscriptionRedemption & Document;
