import { DeliveryMethodController } from '../delivery_method.controller';
import { DeliveryMethodService } from '../delivery_method.service';
import { Test } from '@nestjs/testing';
import { delivery_methodStub } from './stubs/delivery_method.stub';
import { JwtService } from '@nestjs/jwt';
import { DeliveryMethod } from '../delivery_method.model';
import { CreateDeliveryMethodDto } from '../dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from '../dto/update-delivery_method.dto';

jest.mock('../delivery_method.service.ts');
describe('Delivery_method controller', () => {
  let deliveryMethodController: DeliveryMethodController;
  let deliveryMethodService: DeliveryMethodService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DeliveryMethodController],
      providers: [
        {
          provide: DeliveryMethodService,
          useValue: {
            create: jest.fn().mockResolvedValue(delivery_methodStub()),
            findAll: jest.fn().mockResolvedValue([delivery_methodStub()]),
            findOne: jest.fn().mockResolvedValue(delivery_methodStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(delivery_methodStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    deliveryMethodController = moduleRef.get<DeliveryMethodController>(
      DeliveryMethodController,
    );
    deliveryMethodService = moduleRef.get<DeliveryMethodService>(
      DeliveryMethodService,
    );
    jest.clearAllMocks();
  });
  it('it should be defined delivery_methodController', () => {
    expect(deliveryMethodController).toBeDefined();
  });
  it('it should be defined delivery_methodServicec', () => {
    expect(deliveryMethodService).toBeDefined();
  });
  describe('create delivery_method', () => {
    describe('when createdelivery_method is called', () => {
      let deliveryMethod: DeliveryMethod;
      let createDeliveryMethod: CreateDeliveryMethodDto;
      beforeEach(async () => {
        createDeliveryMethod = {
          name: 'name1',
        };
        deliveryMethod = await deliveryMethodController.create(
          createDeliveryMethod,
        );
      });
      test('then it should call deliveryMethodService', () => {
        expect(deliveryMethodService.create).toBeCalledWith(
          createDeliveryMethod,
        );
      });
      test('then it should return customer', () => {
        expect(deliveryMethod).toEqual(delivery_methodStub());
      });
    });
  });
  describe('getAll delivery_method', () => {
    describe('when getAll delivery_method is called', () => {
      let deliveryMethod: DeliveryMethod[];
      beforeEach(async () => {
        deliveryMethod = await deliveryMethodController.findAll();
      });
      test('then it should call deliveryMethodService', () => {
        expect(deliveryMethodService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return customer_card', () => {
        expect(deliveryMethod).toEqual([delivery_methodStub()]);
      });
    });
  });
  describe('getOne delivery_method', () => {
    describe('when findOne is called', () => {
      let deliveryMethod: DeliveryMethod;
      beforeEach(async () => {
        deliveryMethod = await deliveryMethodController.findOne(
          '' + delivery_methodStub().id,
        );
      });
      test('then it should call deliveryMethodService', () => {
        expect(deliveryMethodService.findOne).toHaveBeenCalledWith(
          delivery_methodStub().id,
        );
      });
      test('then it should return delivery_method', () => {
        expect(deliveryMethod).toEqual(delivery_methodStub());
      });
    });
  });
  describe('delete Delivery_method', () => {
    describe('when deleteCustomer_card is called', () => {
      let delivery_method: boolean;
      beforeEach(async () => {
        delivery_method = await deliveryMethodController.delete(
          '' + delivery_methodStub().id,
        );
      });
      test('then it should call delivery_methodService', () => {
        expect(deliveryMethodService.delete).toBeCalledWith(
          delivery_methodStub().id,
        );
      });
      test('then it should return true', () => {
        expect(delivery_method).toEqual(true);
      });
    });
  });
  describe('update Delivery_method', () => {
    describe('when updateOneDeliveryMethod is called', () => {
      let delivery_method: DeliveryMethod;
      let updateDeliveryMethodDto: UpdateDeliveryMethodDto;
      beforeEach(async () => {
        updateDeliveryMethodDto = {
          name: 'name2',
        };
        delivery_method = await deliveryMethodController.update(
          '' + delivery_methodStub().id,
          updateDeliveryMethodDto,
        );
      });
      test('then it should call delivery_methodService', () => {
        expect(deliveryMethodService.update).toHaveBeenCalledWith(
          delivery_methodStub().id,
          updateDeliveryMethodDto,
        );
      });
      test('then it should return booking', () => {
        expect(delivery_method).toEqual(delivery_methodStub());
      });
    });
  });
});
