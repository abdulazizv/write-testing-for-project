import { BookingController } from '../booking.controller';
import { BookingService } from '../booking.service';
import { Test } from '@nestjs/testing';
import { bookingStub } from './stubs/booking.stub';
import { JwtService } from '@nestjs/jwt';
import { Booking } from '../booking.model';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { UpdateBookingDto } from '../dto/update-booking.dto';

jest.mock('../booking.service');
describe('booking controller', () => {
  let bookingController: BookingController;
  let bookingService: BookingService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: {
            create: jest.fn().mockResolvedValue(bookingStub()),
            findAll: jest.fn().mockResolvedValue([bookingStub()]),
            findOne: jest.fn().mockResolvedValue(bookingStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(bookingStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    bookingController = moduleRef.get<BookingController>(BookingController);
    bookingService = moduleRef.get<BookingService>(BookingService);
    jest.clearAllMocks();
  });
  it('it should be defined bookingController', () => {
    expect(bookingController).toBeDefined();
  });
  it('it should be defined bookingService', () => {
    expect(bookingService).toBeDefined();
  });
  describe('create Books', () => {
    describe('when createBook is called', () => {
      let booking: Booking;
      let createBookingDto: CreateBookingDto;
      beforeEach(async () => {
        createBookingDto = {
          cart_id: bookingStub().cart_id,
          payment_method_id: bookingStub().payment_method_id,
          delivery_method_id: bookingStub().delivery_method_id,
          discount_id: bookingStub().discount_id,
          stastus_id: bookingStub().stastus_id,
        };
        booking = await bookingController.create(createBookingDto);
      });
      test('then it should call bookingService', () => {
        expect(bookingService.create).toBeCalledWith(createBookingDto);
      });
      test('then it should return booking', () => {
        expect(booking).toEqual(bookingStub());
      });
    });
  });
  describe('getAll books', () => {
    describe('when getAll booking is called', () => {
      let booking: Booking[];
      beforeEach(async () => {
        booking = await bookingController.findAll();
      });
      test('then it should call bookingService', () => {
        expect(bookingService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return booking', () => {
        expect(booking).toEqual([bookingStub()]);
      });
    });
  });
  describe('getOne booking', () => {
    describe('when findone is called', () => {
      let booking: Booking;
      beforeEach(async () => {
        booking = await bookingController.findOne(bookingStub().id);
      });
      test('then it should call bookingService', () => {
        expect(bookingService.findOne).toHaveBeenCalledWith(bookingStub().id);
      });
      test('then it should return booking', () => {
        expect(booking).toEqual(bookingStub());
      });
    });
  });
  describe('delete Boooking', () => {
    describe('when deleteBooking is called', () => {
      let booking: boolean;
      beforeEach(async () => {
        booking = await bookingController.delete(bookingStub().id);
      });
      test('then it should call bookingService', () => {
        expect(bookingService.delete).toBeCalledWith(bookingStub().id);
      });
      test('then it should return booking', () => {
        expect(booking).toEqual(true);
      });
    });
  });
  describe('update booking', () => {
    describe('when updateOneBooking is called', () => {
      let booking: Booking;
      let updateBookingDto: UpdateBookingDto;
      beforeEach(async () => {
        updateBookingDto = {
          cart_id: bookingStub().cart_id,
          payment_method_id: bookingStub().payment_method_id,
          delivery_method_id: bookingStub().delivery_method_id,
          discount_id: bookingStub().discount_id,
          stastus_id: bookingStub().stastus_id,
        };
        booking = await bookingController.update(
          bookingStub().id,
          updateBookingDto,
        );
      });
      test('then it should call bookingService', () => {
        expect(bookingService.update).toHaveBeenCalledWith(
          bookingStub().id,
          updateBookingDto,
        );
      });
      test('then it should return booking', () => {
        expect(booking).toEqual(bookingStub());
      });
    });
  });
});
