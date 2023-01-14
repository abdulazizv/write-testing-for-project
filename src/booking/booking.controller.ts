import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { adminGuard } from '../common/guards/admin.guard';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: "Booking qo'shish" })
  @ApiResponse({ status: 201, type: Booking })
  @UseGuards(adminGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @ApiOperation({ summary: 'Bookinglarni olish' })
  @ApiResponse({ status: 200, type: [Booking] })
  @UseGuards(adminGuard)
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @ApiOperation({ summary: 'Booking olish' })
  @ApiResponse({ status: 200, type: Booking })
  @UseGuards(adminGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Booking yangilash' })
  @ApiResponse({ status: 202, type: Booking })
  @UseGuards(adminGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @ApiOperation({ summary: "Booking o'chirish" })
  @ApiResponse({ status: 203, type: Booking })
  @UseGuards(adminGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.bookingService.delete(+id);
  }
}
