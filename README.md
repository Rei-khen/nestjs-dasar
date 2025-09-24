# NestJS Dasar

## Module

Untuk membuat modul, kita bisa menjalankan perintah:

```bash
nest generate module nama_module
```

atau dengan shortcut:

```bash
nest g mo nama_module
```

**Contoh:**

```bash
nest generate module user
```

### Hasil yang Dihasilkan

Setelah menjalankan perintah di atas, struktur project akan menjadi:

```
src/
├── user/
│   └── user.module.ts
└── app.module.ts
```

**Isi file `src/user/user.module.ts`:**

```typescript
import { Module } from '@nestjs/common';

@Module({})
export class UserModule {}
```

**Perubahan otomatis pada `src/app.module.ts`:**

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule], // UserModule otomatis ditambahkan di sini
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Fitur Module

1. **Dekorator `@Module()`** - digunakan untuk mendefinisikan module
2. **Properties yang tersedia:**
   - `imports` - modul-modul lain yang diimport
   - `controllers` - controller yang dimiliki module
   - `providers` - service/provider yang dimiliki module
   - `exports` - provider yang diexport ke modul lain

### Contoh Module yang Lengkap

```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [], // modul lain yang diimport
  controllers: [UserController], // controller
  providers: [UserService], // service/provider
  exports: [UserService], // provider yang diexport
})
export class UserModule {}
```

### Path Custom

Kita juga bisa menentukan path tertentu untuk module:

```bash
nest generate module features/user
```

Perintah di atas akan membuat module di folder `src/features/user/`

## Controller

Controller bertugas sebagai class untuk merespon HTTP request yang masuk dan mengembalikan HTTP response.

Untuk membuat controller, kita bisa menjalankan perintah:

```bash
nest generate controller nama_controller
```

atau dengan shortcut:

```bash
nest g co nama_controller
```

**Contoh:**

```bash
nest generate controller user
```

### Hasil yang Dihasilkan

Setelah menjalankan perintah di atas, struktur project akan menjadi:

```
src/
├── user/
│   ├── user.module.ts
│   ├── user.controller.spec.ts
│   └── user.controller.ts
└── app.module.ts
```

**Isi file `src/user/user.controller.ts`:**

```typescript
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}
```

**Perubahan otomatis pada `src/user/user.module.ts`:**

```typescript
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController], // Controller otomatis terdaftar
})
export class UserModule {}
```

### Fitur Controller

1. **Dekorator `@Controller()`** - digunakan untuk mendefinisikan route dasar
2. **HTTP Method Decorators**:
   - `@Get(path)` - untuk menangani GET requests
   - `@Post(path)` - untuk menangani POST requests
   - `@Put(path)` - untuk menangani PUT requests
   - `@Delete(path)` - untuk menangani DELETE requests
   - `@Patch(path)` - untuk menangani PATCH requests

### Contoh Controller yang Lengkap

```typescript
import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('api/user') //buka di postman dengan method post http://localhost:3000/api/user
export class UserController {
  @Post()
  post(): string {
    // nama fungsi bisa bebas tidak harus post() yang penting ada decoratornya @Post
    return 'post';
  }

  @Get('/admin') //buka di browser http://localhost:3000/api/user/admin
  ambilDataUser(): string {
    return 'selamat kamu sekarang admin';
  }
}
```

### Path Custom untuk Controller

Kita juga bisa menentukan path tertentu untuk controller:

```bash
nest generate controller features/user
```

Perintah di atas akan membuat controller di folder `src/features/user/`

# HTTP Request dalam NestJS

Saat membuat routing, biasanya kita ingin mendapatkan informasi yang dikirim oleh client melalui HTTP Request, baik itu berupa Query parameter, Headers, request body, dan lain-lain.

## Request Decorators

Beberapa decorator yang bisa digunakan untuk mengakses data request:

- `@Req()` - untuk mengakses `express.Request` object
- `@Param(key?)` - untuk mengakses route parameters (`req.params`)
- `@Body(key?)` - untuk mengakses request body (`req.body`)
- `@Query(key?)` - untuk mengakses query parameters (`req.query`)
- `@Header(key?)` - untuk mengakses request headers (`req.headers`)
- `@Ip()` - untuk mengakses client IP address (`req.ip`)
- `@HostParam()` - untuk mengakses host parameters

## Contoh Penggunaan Decorators

### 1. `@Req()` - Express Request Object

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('api/user')
export class UserController {
  @Get(':id')
  get(@Req() request: Request): string {
    return `Halo selamat datang ${request.params.id}`;
  }
}
```

**Note:** Cara ini bisa digunakan tapi tidak direkomendasikan. Lebih baik menggunakan decorator khusus.

### 2. `@Param(key?)` - Route Parameters

```typescript
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/user')
export class UserController {
  @Get(':id')
  get(@Param('id') id: string): string {
    return `Halo selamat datang ${id}`;
  }
}
```

**Testing:** Buka http://localhost:3000/api/user/input_bebas

### 3. `@Body(key?)` - Request Body

```typescript
import { Controller, Post, Body } from '@nestjs/common';

@Controller('api/user')
export class UserController {
  @Post()
  create(@Body() body: any): string {
    return `Halo ${body.name}, umur kamu ${body.age} tahun`;
  }
}
```

**Testing:**

- Method: POST
- URL: http://localhost:3000/api/user
- Body (JSON):

```json
{
  "name": "John",
  "age": 25
}
```

### 4. `@Query(key?)` - Query Parameters

```typescript
import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/user')
export class UserController {
  @Get()
  find(@Query('name') name: string, @Query('age') age: string): string {
    return `Halo ${name}, umur kamu ${age} tahun`;
  }
}
```

**Testing:**

- Method: GET
- URL: http://localhost:3000/api/user?name=tes&age=20

### 5. `@Headers(key?)` - Request Headers

```typescript
import { Controller, Get, Headers } from '@nestjs/common';

@Controller('api/user')
export class UserController {
  @Get('check-header')
  checkHeader(@Headers('user-agent') userAgent: string): string {
    return `User Agent kamu: ${userAgent}`;
  }
}
```

**Testing:**

- Method: GET
- URL: http://localhost:3000/api/user/check-header

### 6. `@Ip()` - Client IP Address

```typescript
import { Controller, Get, Ip } from '@nestjs/common';

@Controller('api/user')
export class UserController {
  @Get('ip')
  getIp(@Ip() ip: string): string {
    return `IP kamu adalah ${ip}`;
  }
}
```

**Testing:**

- Method: GET
- URL: http://localhost:3000/api/user/ip

### 7. `@HostParam()` - Host Parameters

```typescript
import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':subdomain.example.com' })
export class UserController {
  @Get()
  getInfo(@HostParam('subdomain') subdomain: string): string {
    return `Subdomain kamu: ${subdomain}`;
  }
}
```

**Testing:**

- URL: http://api.example.com:3000/

## Best Practices

1. **Gunakan decorator khusus** daripada `@Req()` untuk kode yang lebih bersih
2. **Validasi data** yang masuk menggunakan DTO (Data Transfer Objects)
3. **Gunakan type safety** dengan mendefinisikan interface untuk request data
4. **Error handling** yang baik untuk menangani input yang tidak valid

## Contoh dengan Validasi DTO

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { IsString, IsInt } from 'class-validator';

class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}

@Controller('api/user')
export class UserController {
  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    return `Halo ${createUserDto.name}, umur kamu ${createUserDto.age} tahun`;
  }
}
```

## HTTP Response di NestJS

Di NestJS, ada dua cara utama untuk menangani HTTP Response:

1.  **Cara Standar (Direkomendasikan)**: Secara default, apa pun yang Anda `return` dari sebuah _method_ di _controller_ akan secara otomatis menjadi _body_ dari HTTP Response. NestJS akan menangani proses serialisasi (mengubah objek/array menjadi JSON) dan mengirimkan response dengan status code yang sesuai (misalnya, `200 OK` untuk GET atau `201 Created` untuk POST).

2.  **Menggunakan Objek Response Bawaan (Library-specific)**: Anda bisa menyuntikkan (_inject_) objek response dari _framework_ yang digunakan (misalnya Express) dengan menggunakan decorator `@Res()`. Cara ini memberikan Anda kontrol penuh atas response, seperti mengatur cookies, header, dan status code secara manual.

**⚠️ Peringatan:** Ketika Anda menggunakan `@Res()`, NestJS akan menonaktifkan mekanisme response standarnya untuk _route_ tersebut. Ini berarti Anda **harus** mengelola response sepenuhnya secara manual. Jika tidak, _request_ akan _hang_ (tidak selesai).

### Contoh Penggunaan `@Res()`

Dengan decorator `@Res()`, Anda bisa memanggil method-method native dari Express, seperti `res.status()` dan `res.json()`.

```typescript
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UserController {
  @Get('profile')
  getProfile(@Res() res: Response) {
    // Anda punya kontrol penuh di sini
    res.status(200).json({
      code: 200,
      status: 'success',
      data: {
        nama: 'John Doe',
        age: 25,
      },
    });
  }
}
```

---

## Response Decorator

Untuk memodifikasi response tanpa harus mengambil alih sepenuhnya menggunakan `@Res()`, NestJS menyediakan beberapa decorator yang sangat berguna. Ini adalah cara yang lebih dianjurkan karena tetap menjaga kompatibilitas dengan fitur NestJS lainnya (seperti Interceptors dan `class-transformer`).

### 1\. `@HttpCode(code)`

Decorator ini digunakan untuk mengubah **status code** default dari sebuah response.

**Contoh:** Secara default, method `POST` akan mengembalikan status `201 Created`. Kita bisa mengubahnya menjadi `200 OK`.

```typescript
import { Controller, Post, HttpCode } from '@nestjs/common';

@Controller('orders')
export class OrderController {
  @Post()
  @HttpCode(200) // Mengubah status code dari 201 menjadi 200
  createOrder(): object {
    return {
      message: 'Order received successfully, processing now.',
    };
  }
}
```

**Hasil:** Saat endpoint ini diakses dengan method POST, response yang diterima akan memiliki status code `200 OK`.

### 2\. `@Header(key, value)`

Decorator ini digunakan untuk menambahkan atau mengubah **response header**.

**Contoh:** Menambahkan header kustom `X-Powered-By` pada response.

```typescript
import { Controller, Get, Header } from '@nestjs/common';

@Controller('reports')
export class ReportController {
  @Get('download')
  @Header('Content-Type', 'application/pdf')
  @Header('X-Powered-By', 'MyAwesomeApp')
  downloadReport(): object {
    return {
      message: 'Report is being generated...',
      url: '/files/report-2025.pdf',
    };
  }
}
```

**Hasil:** Response dari endpoint ini akan menyertakan header `Content-Type: application/pdf` dan `X-Powered-By: MyAwesomeApp`.

### 3\. `@Redirect(url, statusCode)`

Decorator ini digunakan untuk melakukan **redirect** ke URL lain. Secara default, status code-nya adalah `302 Found`.

#### a. Redirect Statis

Redirect ke alamat yang sudah pasti.

```typescript
import { Controller, Get, Redirect } from '@nestjs/common';

@Controller('docs')
export class DocsController {
  @Get()
  @Redirect('https://docs.nestjs.com', 301) // Redirect permanen
  getDocs() {
    // Method ini tidak perlu return apa-apa
  }
}
```

**Hasil:** Mengakses `http://localhost:3000/docs` akan langsung mengarahkan pengguna ke `https://docs.nestjs.com` dengan status `301 Moved Permanently`.

#### b. Redirect Dinamis

Anda bisa menentukan URL redirect secara dinamis dengan me-`return` sebuah objek dengan properti `url` dan `statusCode` (opsional).

```typescript
import { Controller, Get, Query, Redirect } from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get()
  @Redirect() // URL tidak didefinisikan di sini
  search(@Query('q') query: string) {
    if (query?.toLowerCase() === 'nestjs') {
      return {
        url: 'https://nestjs.com', // Redirect ke sini
      };
    }
    return {
      url: `https://www.google.com/search?q=${query}`, // Redirect ke Google
      statusCode: 302,
    };
  }
}
```

**Hasil:**

- Mengakses `/search?q=nestjs` akan redirect ke `https://nestjs.com`.
- Mengakses `/search?q=typescript` akan redirect ke `https://www.google.com/search?q=typescript`.

### 4\. `@Next()`

Decorator ini digunakan untuk menyuntikkan fungsi `next()` dari Express. Ini umumnya digunakan dalam skenario yang lebih kompleks, seperti saat membuat middleware secara manual, untuk meneruskan kontrol ke _handler_ berikutnya dalam rantai request.

**Catatan:** Penggunaan `@Next()` jarang dibutuhkan dalam aplikasi standar dan lebih sering ditemukan saat integrasi dengan pustaka berbasis Express.

```typescript
import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Controller('legacy')
export class LegacyController {
  @Get('*')
  handleLegacy(@Next() next: NextFunction) {
    console.log('Middleware logic running before passing to next handler...');
    // Teruskan kontrol ke handler/middleware berikutnya
    next();
  }
}
```
