import { DiscountController } from '../discount.controller';
import { DiscountService } from '../discount.service';
import { Test } from '@nestjs/testing';
import { discountStub } from './stubs/discount.stub';
import { JwtService } from '@nestjs/jwt';
import { Discount } from '../discount_model';
import { CreateDiscountDto } from '../dto/create-discount.dto';
import { UpdateDiscountDto } from '../dto/update-discount.dto';

jest.mock('../discount.service.ts');
describe('Discount controller', () => {
  let discountController: DiscountController;
  let discountService: DiscountService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [
        {
          provide: DiscountService,
          useValue: {
            create: jest.fn().mockResolvedValue(discountStub()),
            findAll: jest.fn().mockResolvedValue([discountStub()]),
            findOne: jest.fn().mockResolvedValue(discountStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(discountStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    discountController = moduleRef.get<DiscountController>(DiscountController);
    discountService = moduleRef.get<DiscountService>(DiscountService);
    jest.clearAllMocks();
  });
  it('it should be defined discountController', () => {
    expect(discountController).toBeDefined();
  });
  it('it should be defined discountService', () => {
    expect(discountService).toBeDefined();
  });
  describe('create discount', () => {
    describe('when createDiscount is called', () => {
      let discount: Discount;
      let createDiscountDto: CreateDiscountDto;
      beforeEach(async () => {
        createDiscountDto = {
          discount: discountStub().discount,
          finish_date: discountStub().finish_date,
        };
        discount = await discountController.create(createDiscountDto);
      });
      test('then it should call discountService', () => {
        expect(discountService.create).toBeCalledWith(createDiscountDto);
      });
      test('then it should return discount', () => {
        expect(discount).toEqual(discountStub());
      });
    });
  });
  describe('getAll discount', () => {
    describe('when getAll discount is called', () => {
      let discount: Discount[];
      beforeEach(async () => {
        discount = await discountController.findAll();
      });
      test('then it should call discountService', () => {
        expect(discountService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return customer_card', () => {
        expect(discount).toEqual([discountStub()]);
      });
    });
  });
  describe('getOne discount', () => {
    describe('when findOne is called', () => {
      let discount: Discount;
      beforeEach(async () => {
        discount = await discountController.findOne('' + discountStub().id);
      });
      test('then it should call deliveryMethodService', () => {
        expect(discountService.findOne).toHaveBeenCalledWith(discountStub().id);
      });
      test('then it should return delivery_method', () => {
        expect(discount).toEqual(discountStub());
      });
    });
  });
  describe('delete Discount', () => {
    describe('when deletediscount is called', () => {
      let discount: boolean;
      beforeEach(async () => {
        discount = await discountController.delete('' + discountStub().id);
      });
      test('then it should call delivery_methodService', () => {
        expect(discountService.delete).toBeCalledWith(discountStub().id);
      });
      test('then it should return true', () => {
        expect(discount).toEqual(true);
      });
    });
  });
  describe('update Discount', () => {
    describe('when updateOneDiscount is called', () => {
      let discount: Discount;
      let updateDiscountDto: UpdateDiscountDto;
      beforeEach(async () => {
        updateDiscountDto = {
          discount: 100,
          finish_date: null,
        };
        discount = await discountController.update(
          '' + discountStub().id,
          updateDiscountDto,
        );
      });
      test('then it should call discountService', () => {
        expect(discountService.update).toHaveBeenCalledWith(
          discountStub().id,
          updateDiscountDto,
        );
      });
      test('then it should return booking', () => {
        expect(discount).toEqual(discountStub());
      });
    });
  });
});
