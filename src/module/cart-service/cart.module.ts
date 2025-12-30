import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { AddToCartService } from './services/add-to-cart.service';

@Module({
  controllers: [CartController],
  providers: [AddToCartService, CartService],
})
export class CartModule {}
