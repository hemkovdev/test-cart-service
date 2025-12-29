import { Body, Controller, Get, Post } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags("Cart")
@ApiBearerAuth() 
@ApiHeader({ name: 'session_id', description: 'Session ID (for guest users)', required: false })
@ApiHeader({ name: 'x-app-platform', description: 'App Platform', required: true })
@ApiHeader({ name: 'x-client-type', description: 'Client Type', required: true })

@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get()
    @ApiOperation({summary: "Get Cart with all details"})
    @ApiQuery({name: "lat", type: Number, description: "Latitude", required: false})
    @ApiQuery({name: "lng", type: Number, description: "Longitude", required: false})
    @ApiQuery({name: "store_id", type: String, description: "Store ID", required: true})
    @ApiResponse({status: 200, description: "Cart retrieved successfully with all refreshed data"})
    getCart() {
        return this.cartService.getCart()
    }

    @Post()
    addToCart(@Body() body: any) {
        return {message: "Item Added", body}
    }
}
