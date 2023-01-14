import { CustomerController } from '../customer.controller';
import { CustomerService } from '../customer.service';
import { Test } from '@nestjs/testing';
import { customerStub } from './stubs/customer.stub';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customer.model';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

jest.mock('../customer.service');
describe('Customer controller', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            create: jest.fn().mockResolvedValue(customerStub()),
            findAll: jest.fn().mockResolvedValue([customerStub()]),
            findOne: jest.fn().mockResolvedValue(customerStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(customerStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    customerController = moduleRef.get<CustomerController>(CustomerController);
    customerService = moduleRef.get<CustomerService>(CustomerService);
    jest.clearAllMocks();
  });
  it('it should be defined customerController', () => {
    expect(customerController).toBeDefined();
  });
  it('it should be defined customerService', () => {
    expect(customerService).toBeDefined();
  });
  describe('create Customer', () => {
    describe('when createCustomer is called', () => {
      let customer: Customer;
      let createCustomerDto: CreateCustomerDto;
      beforeEach(async () => {
        createCustomerDto = {
          email: customerStub().email,
          first_name: customerStub().first_name,
          gender: customerStub().gender,
          hashed_password: customerStub().hashed_password,
          lang_id: customerStub().lang_id,
          birth_date: new Date(),
          last_name: customerStub().first_name,
          phone: customerStub().phone,
        };
        customer = await customerController.create(createCustomerDto);
      });
      test('then it should call customerService', () => {
        expect(customerService.create).toBeCalledWith(createCustomerDto);
      });
      test('then it should return customer', () => {
        expect(customer).toEqual(customerStub());
      });
    });
  });
  describe('getAll customers', () => {
    describe('when getAll customer is called', () => {
      let customer: Customer[];
      beforeEach(async () => {
        customer = await customerController.findAll();
      });
      test('then it should call customerService', () => {
        expect(customerService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return customer', () => {
        expect(customer).toEqual([customerStub()]);
      });
    });
  });
  describe('getOne customer', () => {
    describe('when findone is called', () => {
      let customer: Customer;
      beforeEach(async () => {
        customer = await customerController.findOne('' + customerStub().id);
      });
      test('then it should call customerService', () => {
        expect(customerService.findOne).toHaveBeenCalledWith(customerStub().id);
      });
      test('then it should return country', () => {
        expect(customer).toEqual(customerStub());
      });
    });
  });
  describe('delete Customer', () => {
    describe('when deleteCustomer is called', () => {
      let customer: boolean;
      beforeEach(async () => {
        customer = await customerController.delete('' + customerStub().id);
      });
      test('then it should call customerService', () => {
        expect(customerService.delete).toBeCalledWith(customerStub().id);
      });
      test('then it should return true', () => {
        expect(customer).toEqual(true);
      });
    });
  });
  describe('update Customer', () => {
    describe('when updateOneCustomer is called', () => {
      let customer: Customer;
      let updateCustomerDto: UpdateCustomerDto;
      beforeEach(async () => {
        updateCustomerDto = {
          email: customerStub().email,
          first_name: customerStub().first_name,
          gender: customerStub().gender,
          hashed_password: customerStub().hashed_password,
          lang_id: customerStub().lang_id,
          birth_date: new Date(),
          last_name: customerStub().first_name,
          phone: customerStub().phone,
        };
        customer = await customerController.update(
          '' + customerStub().id,
          updateCustomerDto,
        );
      });
      test('then it should call customerService', () => {
        expect(customerService.update).toHaveBeenCalledWith(
          customerStub().id,
          updateCustomerDto,
        );
      });
      test('then it should return booking', () => {
        expect(customer).toEqual(customerStub());
      });
    });
  });
});
