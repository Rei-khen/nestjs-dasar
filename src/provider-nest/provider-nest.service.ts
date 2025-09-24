import { Injectable } from '@nestjs/common';

// ini adalah provider jenis service
//cara membuatnya bisa dengan menjalankan perintah nest generate service nama-path
@Injectable()
export class ProviderNestService {
  //membuat fungsi yang akan diekspor atau akan di injeksikan ke module lain
  //untuk penggunaannya bisa diliat di provider-nest.controller.ts
  sayHello(nama: string): string {
    return `hello ${nama}`;
  }
}
