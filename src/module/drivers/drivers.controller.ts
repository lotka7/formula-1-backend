import { Controller, Get, HttpCode } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  @HttpCode(200)
  async get() {
    return this.driversService.getDrivers();
  }
}
