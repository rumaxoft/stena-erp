import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static port(): number {
    const { PORT } = process.env;
    return PORT && Number(PORT) ? Number(PORT) : 3000;
  }
}
