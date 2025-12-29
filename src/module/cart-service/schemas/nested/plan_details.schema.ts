import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class PlanDetails {
  @Prop() plan_id?: string;
  @Prop() plan_title?: string;
  @Prop() plan_description?: string;
  @Prop() plan_image_url?: string;
  @Prop() pack_quantity?: string;
  @Prop() validity_days?: string;
  @Prop() billing_states?: string[];
  @Prop() selected_billing_state?: string;
}

export const PlanDetailSchema = SchemaFactory.createForClass(PlanDetails);
export type PlanDetailsDocument = PlanDetails & Document;
