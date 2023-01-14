import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { JwtModule } from '@nestjs/jwt';
import { BookingModule } from 'src/booking/booking.module';
import { CountryModule } from 'src/country/country.module';
@Module({
  imports:[SequelizeModule.forFeature([Admin]),
  JwtModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports:[AdminService,AdminModule]
})
export class AdminModule {}
