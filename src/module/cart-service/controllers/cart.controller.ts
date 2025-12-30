import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddToCartDto, AddToCartResponseDto } from '../dtos';
import {
  Channel,
  CustomerId,
  OptionalCustomerId,
  SessionId,
} from 'src/common/decorators';
import { AddToCartService } from '../services/add-to-cart.service';

@ApiTags('Cart')
@ApiBearerAuth()
@ApiHeader({
  name: 'session_id',
  description: 'Session ID (for guest users)',
  required: false,
})
@ApiHeader({
  name: 'x-app-platform',
  description: 'App Platform',
  required: true,
})
@ApiHeader({
  name: 'x-client-type',
  description: 'Client Type',
  required: true,
})
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly addToCartService: AddToCartService,
  ) {}

  // GET CART WITH ALL DETAILS
  @Get()
  @ApiOperation({ summary: 'Get Cart with all details' })
  @ApiQuery({
    name: 'lat',
    type: Number,
    description: 'Latitude',
    required: false,
  })
  @ApiQuery({
    name: 'lng',
    type: Number,
    description: 'Longitude',
    required: false,
  })
  @ApiQuery({
    name: 'store_id',
    type: String,
    description: 'Store ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Cart retrieved successfully with all refreshed data',
  })
  async getCart(@CustomerId() customerId: string) {
    return this.cartService.getCart();
  }

  // ADD ITEM TO CART
  @Post('add-to-cart')
  @ApiOperation({
    summary: 'Add items(s) to cart',
    description:
      'Creates a new cart or adds items to an existing cart. Supports both registered and guest users',
  })
  @ApiBody({ type: AddToCartDto })
  @ApiResponse({
    status: 201,
    description: 'Item(s) added to cart successfully',
    type: AddToCartResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request body or business rule violation',
  })
  @ApiResponse({
    status: 404,
    description: 'Store or product not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Store mismatch - Cart has items from different store',
  })
  addToCart(
    @OptionalCustomerId() customerId: string,
    @Channel() channel: string,
    @SessionId() sessionId: string,
    @Body() dto: AddToCartDto,
  ) {
    return this.addToCartService.addToCart(dto, channel, customerId, sessionId);
  }
}
