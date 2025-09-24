import { Module } from '@nestjs/common';
import { ProviderNestController } from './provider-nest.controller';
import { ProviderNestService } from './provider-nest.service';

@Module({
  controllers: [ProviderNestController],
  providers: [ProviderNestService]
})
export class ProviderNestModule {}
