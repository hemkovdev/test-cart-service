import { Injectable } from '@nestjs/common';
import { AddToCartDto, AddToCartResponseDto } from '../dtos';
import { UserType } from '../enums';

@Injectable()
export class AddToCartService {
  async addToCart(
    dto: AddToCartDto,
    channel: string,
    customerId?: string,
    sessionId?: string,
  ) {
    // Step 1: Resolve user identity
    const user = this.resolveUser(customerId, sessionId);

    return dto;
  }

  private resolveUser(customerId?: string, sessionId?: string) {
    if (customerId) {
      return {
        userId: customerId,
        userType: UserType.REGISTERED,
      };
    }

    if (sessionId) {
      return {
        userId: `guest_${sessionId}`,
        sessionId,
        userType: UserType?.GUEST,
      };
    }
  }
}
