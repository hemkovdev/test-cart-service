import { Injectable } from "@nestjs/common";
import { AddToCartDto, AddToCartResponseDto } from "../dtos";


@Injectable()

export class AddToCartService {

    async addToCart(dto: AddToCartDto, channel: string, customerId?: string, sessionId?: string) {
        return dto
    }
}

