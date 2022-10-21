import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './controllers/role/role.module';
import { UserModule } from './controllers/user/user.module';
@Global()
@Module({
  imports: [RoleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
