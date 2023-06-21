import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { MyLogger } from 'src/logger/services/my-logger.service';
import Driver from './interfaces/driver.interface';

@Injectable()
export class DriversService {
  constructor(private myLogger: MyLogger) {
    // Due to transient scope, StockService has its own unique instance of MyLogger,
    // so setting context here will not affect other instances in other services
    this.myLogger.setContext('DriversService');
    this.loadDrivers();
    this.assignRandomPlaces();
    // Load image URLs for each driver
    this.loadDriverImageUrls();
  }

  // Lifecycle event
  OnModuleInit() {
    this.myLogger.customLog('The DriversService module has been initialized!');
  }

  private drivers: Driver[];

  private loadDrivers() {
    const jsonData = fs.readFileSync('src/drivers.json', 'utf8');
    this.drivers = JSON.parse(jsonData);
    this.myLogger.customLog('Load dirivers from JSON in memory!');
  }

  public assignRandomPlaces() {
    const shuffledDrivers = this.shuffle(this.drivers);
    for (let i = 0; i < shuffledDrivers.length; i++) {
      shuffledDrivers[i].place = i + 1;
    }

    this.drivers.sort((a, b) => a.place - b.place);
    this.myLogger.customLog('Assigned random places to drivers!');
  }

  private shuffle(array: any[]) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private loadDriverImageUrls() {
    console.log(__dirname);
    const publicDir = path.join(__dirname, '../../..', 'src', 'public');
    console.log('asd', publicDir);
    for (const driver of this.drivers) {
      const imgUrl = path.join(publicDir, `${driver.code.toLowerCase()}.jpg`);
      driver.imgUrl = imgUrl;
    }
  }

  public overtakeDriver(driverId: number, drivers: Driver[]) {
    // const driverIndex = this.drivers.findIndex(
    //   (driver) => driver.id === driverId,
    // );

    // if (driverIndex === -1) {
    //   throw new NotFoundException(`Driver with ID ${driverId} not found.`);
    // }

    // const currentDriver = this.drivers[driverIndex];
    // const targetIndex = this.drivers.findIndex(
    //   (driver) => driver.place === targetPlace,
    // );

    // if (targetIndex === -1) {
    //   throw new NotFoundException(
    //     `Driver with place ${targetPlace} not found.`,
    //   );
    // }

    // const targetDriver = this.drivers[targetIndex];

    // if (currentDriver.place < targetDriver.place) {
    //   for (let i = driverIndex; i < targetIndex + 1; i++) {
    //     if (this.drivers[i].id === currentDriver.id) {
    //       this.drivers[driverIndex].place = targetDriver.place;
    //     } else {
    //       this.drivers[i].place--;
    //     }
    //   }
    // } else {
    //   for (let i = targetIndex; i < driverIndex + 1; i++) {
    //     if (this.drivers[i].id === currentDriver.id) {
    //       this.drivers[driverIndex].place = targetDriver.place - 1;
    //     } else {
    //       this.drivers[i].place++;
    //     }
    //   }
    // }

    this.drivers = drivers;

    // Sort the drivers based on their new places
    this.drivers.sort((a, b) => a.place - b.place);
  }

  public async getDrivers() {
    console.log(this.drivers);
    return this.drivers;
  }
}
