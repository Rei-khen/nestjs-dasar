import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpResModule } from './http-res/http-res.module';

@Module({
  imports: [UserModule, HttpResModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
