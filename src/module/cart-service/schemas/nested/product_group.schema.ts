import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class ProductGroup {
  @Prop() id: string;
  @Prop() title: string;
  @Prop() image_url: string;
}

export const ProductGroupSchema = SchemaFactory.createForClass(ProductGroup);
export type ProductGroupDocument = ProductGroup & Document;
