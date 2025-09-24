import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('cookie-nest')
export class CookieNestController {
  @Get('/set-cookie')
  setCookie(@Query('nama') nama: string, @Res() res: Response) {
    res.cookie('nama', nama);
    res.status(200).send('berhasil membuat cookie');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request) {
    return req.cookies.nama;
  }
}
