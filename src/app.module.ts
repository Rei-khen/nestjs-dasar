import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpResModule } from './http-res/http-res.module';
import { CookieNestModule } from './cookie-nest/cookie-nest.module';
import { ProviderNestModule } from './provider-nest/provider-nest.module';

@Module({
  imports: [UserModule, HttpResModule, CookieNestModule, ProviderNestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
