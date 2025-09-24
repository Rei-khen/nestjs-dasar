import { Controller, Get, Query } from '@nestjs/common';
import { ProviderNestService } from './provider-nest.service'; //mengimpor dependensi

@Controller('provider-nest')
export class ProviderNestController {
  //NestJS bisa melakukan Dependency Injection secara otomatis, kita cukup tambahkan Provider yang dibutuhkan pada Constructor
  constructor(private providerNestService: ProviderNestService) {}

  @Get()
  async sayHello(@Query('nama') nama: string): Promise<string> {
    return this.providerNestService.sayHello(nama); //menggunakan fungsi sayHello dari service
  }
}
