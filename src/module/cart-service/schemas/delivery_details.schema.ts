import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Coordinates } from './nested/coordinates.schema';

@Schema({ _id: false })
export class DeliveryDetails {
  @Prop() address_id?: string;
  @Prop({ required: true }) address_line_1: string;
  @Prop() address_line_2?: string;
  @Prop() city: string;
  @Prop() postal_code?: string;
  @Prop() directin_to_reach?: string;
  @Prop({ type: Coordinates }) coordinates: Coordinates;
  @Prop() tag?: string;
  @Prop() is_default?: boolean;
  @Prop() eta_in_min?: string;
  @Prop() last_synced_at?: Date;
}

export const DeliveryDetailsSchema =
  SchemaFactory.createForClass(DeliveryDetails);
export type DeliverDetailsDocument = DeliveryDetails & Document;
