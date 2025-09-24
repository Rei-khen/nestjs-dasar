import { Controller, Get, Post, Put, Delete, Res, Req } from '@nestjs/common';
import type { Response, Request } from 'express';

@Controller('http-res/user')
export class HttpResController {
  @Get()
  contohResponse(@Res() res: Response) {
    res
      .status(200)
      .json({ code: 200, status: 'success', data: { nama: 'jhon', age: 25 } });
  }
}
