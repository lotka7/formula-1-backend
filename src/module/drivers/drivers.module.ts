import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyLogger } from 'src/logger/services/my-logger.service';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService, MyLogger],
  imports: [ConfigModule],
})
export class DriversModule {}
