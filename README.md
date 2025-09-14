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
