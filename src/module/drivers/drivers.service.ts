import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/logger/services/my-logger.service';

@Injectable()
export class DriversService {
  constructor(private myLogger: MyLogger) {
    // Due to transient scope, StockService has its own unique instance of MyLogger,
    // so setting context here will not affect other instances in other services
    this.myLogger.setContext('DriversService');
  }

  async getDrivers() {
    console.log('todo drivers');

    return 'drivers';
  }
}
