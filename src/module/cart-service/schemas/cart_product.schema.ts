import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductGroup } from './nested/product_group.schema';
import { PlanDetails } from './nested/plan_details.schema';
import { Pricing } from './pricing.schema';
import { SubscriptionRedemption } from './nested/subscription_redemption.schema';

@Schema({ _id: false })
export class CartProduct {
  @Prop({ required: true }) cart_product_id: string;

  // product reference
  @Prop({ default: null }) product_id?: string;
  @Prop({ default: null }) combo_def_id?: string;

  // product type
  @Prop({ required: true, enum: ['REGULAR', 'SUBSCRIPTION_PACK', 'COMBO'] })
  product_type: string;

  // for REGULAR & COMBO
  @Prop({ type: () => ProductGroup }) product_group?: ProductGroup;

  // for SUBSCRIPTION_PACK
  @Prop({ type: () => PlanDetails }) plan_details: PlanDetails;

  // common product info
  @Prop({ required: true }) product_title: string;

  // Pricing
  @Prop({ type: () => Pricing, required: true }) pricing: Pricing;

  // Quantity
  @Prop() quantity?: number;
  @Prop() original_price_with_addons?: number;
  @Prop() selling_price_with_addons?: number;
  @Prop({ type: SubscriptionRedemption })
  subscription_redemption?: SubscriptionRedemption;

  // Customizations
  @Prop({ type: [String], default: [] }) preferences?: String[];
  @Prop() grid_type?: string;
  @Prop({ type: [String], default: [] }) special_instructions?: String[];

  // Availability
  @Prop({ default: true }) is_available: boolean;

  // Audit
  @Prop({ default: Date.now }) added_at: Date;
  @Prop() last_synced_at: Date;

  // Addd-ons (recursive cart product)
  @Prop({ type: () => [CartProductSchema], default: [] }) addons: CartProduct[];
}

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);
export type CartProductDocument = CartProduct & Document;
