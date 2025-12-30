import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Channel = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const platform = String(
      request.headers['x-app-platform'] || '',
    ).toLowerCase();
    const clientType = String(
      request.headers['x-app-platform'] || '',
    ).toLowerCase();

    if (clientType === 'kiosk_app') {
      return 'KIOSK';
    }

    if (clientType === 'customer_app') {
      if (platform === 'android' || platform === 'ios') {
        return 'MOBILE';
      }

      if (platform === 'WEB') {
        return 'WEB';
      }
    }

    throw new BadRequestException('Invalid Platform');
  },
);
