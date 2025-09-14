import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
  Ip,
  HostParam,
  Req,
} from '@nestjs/common';
// import { Request } from 'express';

@Controller('api/user')
export class UserController {
  // @Req() - ambil seluruh request object
  //   @Get('req/:id')
  //   getByReq(@Req() request: Request): string {
  //     return `Halo selamat datang ${request.params.id}`;
  //   }

  // @Param() - ambil path param
  @Get(':id')
  getByParam(@Param('id') id: string): string {
    return `Halo selamat datang ${id}`;
  }

  // @Body() - ambil data body (POST)
  @Post()
  create(@Body() body: any): string {
    return `Halo ${body.name}, umur kamu ${body.age} tahun`;
  }

  // @Query() - ambil query string
  @Get()
  find(@Query('name') name: string, @Query('age') age: string): string {
    return `Halo ${name}, umur kamu ${age}`;
  }

  // @Headers() - ambil header tertentu
  @Get('check-header')
  checkHeader(@Headers('user-agent') userAgent: string): string {
    return `User Agent kamu: ${userAgent}`;
  }

  // @Ip() - ambil IP client
  @Get('ip')
  getIp(@Ip() ip: string): string {
    return `IP kamu adalah ${ip}`;
  }
}

// contoh penggunaan @HostParam (perlu routing berbasis host)
@Controller({ host: ':subdomain.localhost' })
export class HostController {
  @Get()
  getInfo(@HostParam('subdomain') subdomain: string): string {
    return `Subdomain kamu: ${subdomain}`;
  }
}
