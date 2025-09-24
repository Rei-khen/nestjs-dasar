import { Module } from '@nestjs/common';
import { CookieNestController } from './cookie-nest.controller';

@Module({
  controllers: [CookieNestController]
})
export class CookieNestModule {}
