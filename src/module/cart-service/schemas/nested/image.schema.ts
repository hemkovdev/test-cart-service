import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Image {
  @Prop() url?: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
export type ImageSchemaDocument = Image & Document;
