import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { OrderType_Enum } from '../enums';
import { Type } from 'class-transformer';

export class AddToCartItemDto {
  @ApiPropertyOptional({
    description: 'Product group ID for categorization',
  })
  @IsOptional()
  @IsString()
  product_group_id?: string;

  @ApiProperty({
    description: 'Product ID to add to cart',
    example: 'prod-3232',
  })
  product_id?: string;

  @ApiPropertyOptional({
    description: 'Array of add-on product IDs',
    example: ['addon-sz-2323', 'addon-cr-43'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  add_on_products?: string[];

  @ApiPropertyOptional({
    description: 'special instructions for item',
    example: ['Make it sweet', 'No Ice'],
  })
  @IsArray()
  @IsString({ each: true })
  instructions?: string[];
  @ApiPropertyOptional({
    description: 'Plan ID for subscription pack purchase',
    example: 'plan-123',
  })
  @IsOptional()
  @IsString()
  plan_id?: string;

  @ApiPropertyOptional({
    description:
      'User subscription ID for pack redemption (subscription_plan_user_mapping ID)',
    example: 'sub-43434',
  })
  @IsOptional()
  @IsString()
  user_subscription_id?: String;

  @ApiProperty({
    description: 'Quantity of the Item',
    example: 2,
    minimum: 1,
  })
  @IsNotEmpty({ message: 'quantity is required' })
  @IsNumber({}, { message: 'quantity must be a number' })
  @Min(1, { message: 'quantity must be atleast 1' })
  quantity: number;

  @ApiPropertyOptional({
    description: 'combo definition ID for combo products',
    example: 'combo-456',
  })
  @IsOptional()
  @IsString()
  combo_id?: string;

  @ApiPropertyOptional({
    description: 'Existing cart prodcut ID(for updating existing item)',
    example: 'cprod_lx7k2m_f9h3j',
  })
  cart_product_id?: string;
}

export class AddToCartDto {
  // STORE ID
  @ApiProperty({
    description: 'Store ID where the order will be placed',
    example: '30',
  })
  @IsNotEmpty({ message: 'store_id is required' })
  @IsString()
  store_id: string;

  // CART ID
  @ApiPropertyOptional({
    description: 'Existing cart ID (if available)',
    example: 'cart_lx7k2m_abc123',
  })
  @IsOptional()
  @IsString()
  cart_id?: string;

  // ORDER TYPE
  @ApiProperty({
    description: 'Order Type',
    example: OrderType_Enum?.PICKUP,
  })
  @IsNotEmpty({ message: 'order_type is required' })
  @IsIn(
    [OrderType_Enum?.DELIVERY, OrderType_Enum?.DINEIN, OrderType_Enum?.PICKUP],
    {
      message: 'order_type must be PICK_UP, DELIVERY, or DINE_IN',
    },
  )
  order_type: OrderType_Enum;

  // ADDRESS ID
  @ApiPropertyOptional({
    description: 'Address ID for delivery orders',
    example: 'addr-123',
  })
  @IsOptional()
  @IsString()
  address_id?: string;

  // ITEMS
  @ApiProperty({
    description: 'Items to add to cart',
    type: [AddToCartItemDto],
  })
  @ArrayNotEmpty({ message: 'items array cannot be empty' })
  @ValidateNested({ each: true })
  @Type(() => AddToCartItemDto)
  items: AddToCartItemDto[];
}
