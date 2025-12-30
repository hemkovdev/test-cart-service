import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SessionId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const sessionId = request.headers['session-id'] as string | undefined;

    return sessionId;
  },
);
