import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '../enums';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class User {
  @Prop({ required: true }) id: string;
  @Prop({
    type: String,
    required: true,
    enum: UserType,
    default: UserType?.GUEST,
  })
  user_type: UserType;
  @Prop({ unique: true, parse: true }) session_id?: string;
  @Prop() device_id?: string;
  @Prop() last_synced_at?: Date;
}


export const userSchema = SchemaFactory.createForClass(User)
export type UserDocument = User & Document
