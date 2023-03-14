import { CustomerCardController } from '../customer_card.controller';
import { CustomerCardService } from '../customer_card.service';
import { Test } from '@nestjs/testing';
import { customer_cardStub } from './stubs/customer_card.stub';
import { JwtService } from '@nestjs/jwt';
import { CustomerCard } from '../customer_card.model';
import { CreateCustomerCardDto } from '../dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from '../dto/update-customer_card.dto';

jest.mock('../customer_card.service.ts');
describe('Customer_card controller', () => {
  let customerCardController: CustomerCardController;
  let customerCardService: CustomerCardService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CustomerCardController],
      providers: [
        {
          provide: CustomerCardService,
          useValue: {
            create: jest.fn().mockResolvedValue(customer_cardStub()),
            findAll: jest.fn().mockResolvedValue([customer_cardStub()]),
            findOne: jest.fn().mockResolvedValue(customer_cardStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(customer_cardStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    customerCardController = moduleRef.get<CustomerCardController>(
      CustomerCardController,
    );
    customerCardService =
      moduleRef.get<CustomerCardService>(CustomerCardService);
    jest.clearAllMocks();
  });
  it('it should be defined customer_cardController', () => {
    expect(customerCardController).toBeDefined();
  });
  it('it should be defined customer_cardService', () => {
    expect(customerCardService).toBeDefined();
  });
  describe('create customerCard', () => {
    describe('when createCustomerCard is called', () => {
      let customerCard: CustomerCard;
      let createCustomerCardDto: CreateCustomerCardDto;
      beforeEach(async () => {
        createCustomerCardDto = {
          customer_id: customer_cardStub().customer_id,
          name: customer_cardStub().name,
          phone: customer_cardStub().phone,
          number: customer_cardStub().number,
          year: customer_cardStub().year,
          month: customer_cardStub().month,
        };
        customerCard = await customerCardController.create(
          createCustomerCardDto,
        );
      });
      test('then it should call customerCardService', () => {
        expect(customerCardService.create).toBeCalledWith(
          createCustomerCardDto,
        );
      });
      test('then it should return customer', () => {
        expect(customerCard).toEqual(customer_cardStub());
      });
    });
  });
  describe('getAll customerCard', () => {
    describe('when getAll customer_card is called', () => {
      let customerCard: CustomerCard[];
      beforeEach(async () => {
        customerCard = await customerCardController.findAll();
      });
      test('then it should call customerCardService', () => {
        expect(customerCardService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return customer_card', () => {
        expect(customerCard).toEqual([customer_cardStub()]);
      });
    });
  });
  describe('getOne customerCard', () => {
    describe('when findone is called', () => {
      let customerCard: CustomerCard;
      beforeEach(async () => {
        customerCard = await customerCardController.findOne(
          '' + customer_cardStub().id,
        );
      });
      test('then it should call customer_cardService', () => {
        expect(customerCardService.findOne).toHaveBeenCalledWith(
          customer_cardStub().id,
        );
      });
      test('then it should return country', () => {
        expect(customerCard).toEqual(customer_cardStub());
      });
    });
  });
  describe('delete Customer_card', () => {
    describe('when deleteCustomer_card is called', () => {
      let customer_card: boolean;
      beforeEach(async () => {
        customer_card = await customerCardController.delete(
          '' + customer_cardStub().id,
        );
      });
      test('then it should call customer_cardService', () => {
        expect(customerCardService.delete).toBeCalledWith(
          customer_cardStub().id,
        );
      });
      test('then it should return true', () => {
        expect(customer_card).toEqual(true);
      });
    });
  });
  describe('update Customer_adress', () => {
    describe('when updateOneCustomer is called', () => {
      let customerCard: CustomerCard;
      let updateCustomerCardDto: UpdateCustomerCardDto;
      beforeEach(async () => {
        updateCustomerCardDto = {
          customer_id: customer_cardStub().customer_id,
          name: customer_cardStub().name,
          phone: customer_cardStub().phone,
          number: customer_cardStub().number,
          year: customer_cardStub().year,
          month: customer_cardStub().month,
        };
        customerCard = await customerCardController.update(
          '' + customer_cardStub().id,
          updateCustomerCardDto,
        );
      });
      test('then it should call customerService', () => {
        expect(customerCardService.update).toHaveBeenCalledWith(
          customer_cardStub().id,
          updateCustomerCardDto,
        );
      });
      test('then it should return booking', () => {
        expect(customerCard).toEqual(customer_cardStub());
      });
    });
  });
});
