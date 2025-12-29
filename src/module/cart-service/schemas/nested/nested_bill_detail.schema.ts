import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class NestedBillDetail {
  @Prop({ required: true }) entity_name: string;
  @Prop({ required: true }) entity_value: string;
  @Prop() text_color?: string;
}

export const NestedBillDetailSchema =
  SchemaFactory.createForClass(NestedBillDetail);
export type NestedBillDetailDocument = NestedBillDetail & Document;
