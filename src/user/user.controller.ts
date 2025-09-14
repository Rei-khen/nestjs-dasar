import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('api/user') //buka di postman dengan method post http://localhost:3000/api/user
export class UserController {
  @Post()
  post(): string {
    // nama fungsi bisa bebas tidak harus post()
    return 'post';
  }

  @Get('/admin') //buka di browser http://localhost:3000/api/user/admin
  ambilDataUser(): string {
    return 'selamat kamu sekarang admin';
  }
}
