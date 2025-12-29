import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class ReceiverDetails {
  @Prop() name?: string;
  @Prop() phone?: string;
}

export const ReceiverDetailsSchema =
  SchemaFactory.createForClass(ReceiverDetails);
export type ReceiverDetailsDocument = ReceiverDetails & Document;
