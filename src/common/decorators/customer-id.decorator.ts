import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomerId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const customerId = request.headers['x-customer-id'] as string | undefined;

    return customerId;
  },
);
