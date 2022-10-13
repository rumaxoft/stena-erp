import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

class DBConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

@Injectable()
export class TypeormService implements OnModuleInit, OnModuleDestroy {
  private databaseConnection?: DataSource;

  async onModuleInit(): Promise<void> {
    try {
      this.databaseConnection = await new DataSource({
        ...this.loadDBConfig(),
        type: 'postgres',
        entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
      }).initialize();
    } catch (error) {
      this.failToConnectDatabase(error);
    }
  }

  private loadDBConfig(): DBConfig {
    return {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10) || 5432,
      database: process.env.DATABASE_NAME || 'my_database',
      username: process.env.DATABASE_USER || 'user',
      password: process.env.DATABASE_PASSWORD || 'mysecretpassword',
      synchronize: 'true' === process.env.DATABASE_SYNC || true,
      logging: 'true' === process.env.DATABASE_LOGGING || true,
    };
  }

  private failToConnectDatabase(error: Error): void {
    console.error(error);
    process.exit(1);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.databaseConnection) await this.databaseConnection.destroy();
  }

  getDbConnection(): DataSource {
    return this.databaseConnection;
  }
}
