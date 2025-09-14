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
