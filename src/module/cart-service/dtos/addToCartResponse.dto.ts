import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDataResponse {
  @ApiProperty({
    description: 'uniquecart product identifier',
    example: 'cprod_lx7k2m_f9h3j',
  })
  cart_product_id: string;

  @ApiProperty({ description: 'Quantity added', example: 2 })
  quantity: number;
}

export class AddToCartResponseDto {
  @ApiProperty({ description: 'Response Status', example: 'success' })
  status: string;

  @ApiProperty({
    description: 'Response message',
    example: 'Item added to cart successfully',
  })
  message: string;

  @ApiProperty({ description: 'Response data', type: AddToCartDataResponse })
  data: AddToCartDataResponse;
}
