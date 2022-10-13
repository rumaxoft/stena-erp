import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/exceptions.filter';
import { LoggerService } from '@/infra/framework/logger/logger.service';
import { LoggingInterceptor } from '@/infra/framework/common/interceptors/logger.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppService } from './app.service';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  // base routing
  app.setGlobalPrefix('api_v1');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Stena-ERP')
      .setDescription('description')
      .setVersion('1.0')
      .addTag('stena')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(AppService.port());
}
bootstrap();
