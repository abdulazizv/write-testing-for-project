import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Booking]),
  JwtModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports:[BookingService]
})
export class BookingModule {}
