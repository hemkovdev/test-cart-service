import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Store } from './store.schema';
import { DeliveryDetails } from './delivery_details.schema';
import { CartProduct } from './cart_product.schema';
import { BillDetail } from './bill_details.schema';
import { Discount } from './discount.schema';
import { CartStatusEnum, Channel, OrderType_Enum } from '../enums';
import { ReceiverDetails } from './receiver-details.schema';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Cart {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ type: () => User, required: true })
  user: User;

  @Prop({ type: () => StorageEvent, requiredL: true })
  store: Store;

  @Prop({ type: DeliveryDetails }) delivery_details?: DeliveryDetails;

  @Prop({ type: () => CartProduct, default: [] }) cart_products: CartProduct[];

  @Prop({ type: () => BillDetail, default: [] }) bill_details: BillDetail;

  @Prop({ type: [() => Discount], default: [] }) discounts: Discount[];

  @Prop()
  instruction?: string;

  @Prop({ type: [String], default: [] })
  cart_notes: string[];

  @Prop({
    type: String,
    enum: OrderType_Enum,
    default: OrderType_Enum.DELIVERY,
  })
  order_type: OrderType_Enum;

  @Prop({ type: String, enum: Channel, default: Channel?.MOBILE })
  channel: Channel;

  @Prop()
  order_type_nudge_message?: string;

  @Prop({ type: String, enum: CartStatusEnum, default: CartStatusEnum?.ACTIVE })
  status: CartStatusEnum;

  @Prop()
  expires_at?: Date;

  @Prop()
  last_price_sync_at?: Date;

  @Prop()
  last_inventory_sync_at?: Date;

  @Prop({ type: () => ReceiverDetails }) receiver_details?: ReceiverDetails;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    Reflect.deleteProperty(ret, '_id');
    return ret;
  },
});

CartSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    Reflect.deleteProperty(ret, '_id');
    return ret;
  },
});

CartSchema.index({ 'user.id': 1, status: 1, 'store.id': 1 });
CartSchema.index({ 'user.session_id': 1, status: 1, 'store.id': 1 });
CartSchema.index({ 'cart_products.product_id': 1 });
CartSchema.index({ status: 1, expires_at: 1 });

export type CartDocument = Cart & Document;

export { CartProduct };
