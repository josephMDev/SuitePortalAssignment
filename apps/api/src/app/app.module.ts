import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AppService } from './app.service';

@Module({
  imports: [MaintenanceRequestModule, 
    AuthModule, 
    UsersModule, 
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
