import { CustomerAdressController } from '../customer_adress.controller';
import { CustomerAdressService } from '../customer_adress.service';
import { Test } from '@nestjs/testing';
import { customer_addressStub } from './stubs/customer_address.stub';
import { JwtService } from '@nestjs/jwt';
import { CustomerAdress } from '../customer_adress.model';
import { CreateCustomerAdressDto } from '../dto/create-customer_adress.dto';
import { UpdateCustomerAdressDto } from '../dto/update-customer_adress.dto';

jest.mock('../customer_adress.service.ts');
describe('Customer_address controller', () => {
  let customerAddressController: CustomerAdressController;
  let customerAddresService: CustomerAdressService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CustomerAdressController],
      providers: [
        {
          provide: CustomerAdressService,
          useValue: {
            create: jest.fn().mockResolvedValue(customer_addressStub()),
            findAll: jest.fn().mockResolvedValue([customer_addressStub()]),
            findOne: jest.fn().mockResolvedValue(customer_addressStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(customer_addressStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    customerAddressController = moduleRef.get<CustomerAdressController>(
      CustomerAdressController,
    );
    customerAddresService = moduleRef.get<CustomerAdressService>(
      CustomerAdressService,
    );
    jest.clearAllMocks();
  });
  it('it should be defined customer_adressController', () => {
    expect(customerAddressController).toBeDefined();
  });
  it('it should be defined customerAdressService', () => {
    expect(customerAddresService).toBeDefined();
  });
  describe('create CustomerAdress', () => {
    describe('when createCustomerAddress is called', () => {
      let customerAdress: CustomerAdress;
      let createCustomerAdressDto: CreateCustomerAdressDto;
      beforeEach(async () => {
        createCustomerAdressDto = {
          customer_id: customer_addressStub().customer_id,
          name: customer_addressStub().name,
          country_id: customer_addressStub().country_id,
          region_id: customer_addressStub().region_id,
          district_id: customer_addressStub().district_id,
          street: customer_addressStub().street,
          house: customer_addressStub().house,
          flat: customer_addressStub().flat,
          location: customer_addressStub().location,
          post_index: customer_addressStub().post_index,
          info: customer_addressStub().info,
        };
        customerAdress = await customerAddressController.create(
          createCustomerAdressDto,
        );
      });
      test('then it should call customerAdressService', () => {
        expect(customerAddresService.create).toBeCalledWith(
          createCustomerAdressDto,
        );
      });
      test('then it should return customer', () => {
        expect(customerAdress).toEqual(customer_addressStub());
      });
    });
  });
  describe('getAll customerAdress', () => {
    describe('when getAll customer_adress is called', () => {
      let customerAdress: CustomerAdress[];
      beforeEach(async () => {
        customerAdress = await customerAddressController.findAll();
      });
      test('then it should call customerAdressService', () => {
        expect(customerAddresService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return customerAdressService', () => {
        expect(customerAdress).toEqual([customer_addressStub()]);
      });
    });
  });
  describe('getOne customerAdress', () => {
    describe('when findone is called', () => {
      let customerAdress: CustomerAdress;
      beforeEach(async () => {
        customerAdress = await customerAddressController.findOne(
          '' + customer_addressStub().id,
        );
      });
      test('then it should call customerAdressService', () => {
        expect(customerAddresService.findOne).toHaveBeenCalledWith(
          customer_addressStub().id,
        );
      });
      test('then it should return country', () => {
        expect(customerAdress).toEqual(customer_addressStub());
      });
    });
  });
  describe('delete Customer_adress', () => {
    describe('when deleteCustomer is called', () => {
      let customer_adress: boolean;
      beforeEach(async () => {
        customer_adress = await customerAddressController.delete(
          '' + customer_addressStub().id,
        );
      });
      test('then it should call customer_adressService', () => {
        expect(customerAddresService.delete).toBeCalledWith(
          customer_addressStub().id,
        );
      });
      test('then it should return true', () => {
        expect(customer_adress).toEqual(true);
      });
    });
  });
  describe('update Customer_adress', () => {
    describe('when updateOneCustomer is called', () => {
      let customerAdress: CustomerAdress;
      let updateCustomerAdressDto: UpdateCustomerAdressDto;
      beforeEach(async () => {
        updateCustomerAdressDto = {
          customer_id: customer_addressStub().customer_id,
          name: customer_addressStub().name,
          country_id: customer_addressStub().country_id,
          region_id: customer_addressStub().region_id,
          district_id: customer_addressStub().district_id,
          street: customer_addressStub().street,
          house: customer_addressStub().house,
          flat: customer_addressStub().flat,
          location: customer_addressStub().location,
          post_index: customer_addressStub().post_index,
          info: customer_addressStub().info,
        };
        customerAdress = await customerAddressController.update(
          '' + customer_addressStub().id,
          updateCustomerAdressDto,
        );
      });
      test('then it should call customerService', () => {
        expect(customerAddresService.update).toHaveBeenCalledWith(
          customer_addressStub().id,
          updateCustomerAdressDto,
        );
      });
      test('then it should return booking', () => {
        expect(customerAdress).toEqual(customer_addressStub());
      });
    });
  });
});
