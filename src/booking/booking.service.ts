import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    return await this.bookingRepository.create(createBookingDto);
  }

  async findAll() {
    return await this.bookingRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.bookingRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const check = await this.bookingRepository.findByPk(id);
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.BAD_REQUEST);
    }
    const newDistrict = await this.bookingRepository.update(
      {
        ...updateBookingDto,
      },
      { where: { id: id }, returning: true },
    );
    return check;
  }

  async delete(id: number) {
    await this.bookingRepository.destroy({
      where: {
        id: +id,
      },
    });
    return true;
  }
}
