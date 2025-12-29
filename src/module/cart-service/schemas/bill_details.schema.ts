import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NestedBillDetail } from './nested/nested_bill_detail.schema';

@Schema({ _id: false })
export class BillDetail {
  @Prop({ required: true, enum: ['ITEM', 'PACK', 'TOTAL'] })
  entity_type: string;
  @Prop({ required: true }) entity_name: string;
  @Prop({ required: true }) entity_value: string;
  @Prop({ default: false }) is_clickable: string;
  @Prop({ default: false }) is_total_item: string;
  @Prop() text_color: string;
  @Prop({ type: [NestedBillDetail], default: [] })
  nested_details: NestedBillDetail;
}

export const BillDetailSchema = SchemaFactory.createForClass(BillDetail);
export type BillDetailDocument = BillDetail & Document;
