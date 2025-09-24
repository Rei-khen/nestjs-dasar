import { Module } from '@nestjs/common';
import { HttpResController } from './http-res.controller';

@Module({
  controllers: [HttpResController]
})
export class HttpResModule {}
