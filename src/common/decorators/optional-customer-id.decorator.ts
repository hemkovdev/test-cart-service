import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OptionalCustomerId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const customerId = request.headers['x-customer-id'] as string | undefined;

    return customerId;
  },
);
