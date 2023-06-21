import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import Driver from './interfaces/driver.interface';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  @HttpCode(200)
  getDrivers() {
    return this.driversService.getDrivers();
  }

  @Post(':driverId/overtake')
  overtakeDriver(
    @Param('driverId') driverId: number,
    @Body() drivers: Driver[],
  ) {
    return this.driversService.overtakeDriver(driverId, drivers);
  }
}
