import { CountryController } from '../country.controller';
import { CountryService } from '../country.service';
import { Test } from '@nestjs/testing';
import { countryStub } from './stubs/country.stub';
import { JwtService } from '@nestjs/jwt';
import { Country } from '../country.model';
import { CreateCountryDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';

jest.mock('../country.service');
describe('country controller', () => {
  let countryController: CountryController;
  let countryService: CountryService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useValue: {
            create: jest.fn().mockResolvedValue(countryStub()),
            findAll: jest.fn().mockResolvedValue([countryStub()]),
            findOne: jest.fn().mockResolvedValue(countryStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(countryStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    countryController = moduleRef.get<CountryController>(CountryController);
    countryService = moduleRef.get<CountryService>(CountryService);
    jest.clearAllMocks();
  });
  it('it should be defined countryController', () => {
    expect(countryController).toBeDefined();
  });
  it('it should be defined countryService', () => {
    expect(countryService).toBeDefined();
  });
  describe('create Country', () => {
    describe('when createCountry is called', () => {
      let country: Country;
      let createCountryDto: CreateCountryDto;
      beforeEach(async () => {
        createCountryDto = {
          country: countryStub().country,
        };
        country = await countryController.create(createCountryDto);
      });
      test('then it should call countryService', () => {
        expect(countryService.create).toBeCalledWith(createCountryDto);
      });
      test('then it should return country', () => {
        expect(country).toEqual(countryStub());
      });
    });
  });
  describe('getAll countries', () => {
    describe('when getAll country is called', () => {
      let country: Country[];
      beforeEach(async () => {
        country = await countryController.findAll();
      });
      test('then it should call countryService', () => {
        expect(countryService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return booking', () => {
        expect(country).toEqual([countryStub()]);
      });
    });
  });
  describe('getOne country', () => {
    describe('when findone is called', () => {
      let country: Country;
      beforeEach(async () => {
        country = await countryController.findOne('' + countryStub().id);
      });
      test('then it should call countryService', () => {
        expect(countryService.findOne).toHaveBeenCalledWith(countryStub().id);
      });
      test('then it should return country', () => {
        expect(country).toEqual(countryStub());
      });
    });
  });
  describe('delete Country', () => {
    describe('when deleteCountry is called', () => {
      let country: boolean;
      beforeEach(async () => {
        country = await countryController.delete('' + countryStub().id);
      });
      test('then it should call countryService', () => {
        expect(countryService.delete).toBeCalledWith(countryStub().id);
      });
      test('then it should return true', () => {
        expect(country).toEqual(true);
      });
    });
  });
  describe('update country', () => {
    describe('when updateOneCountry is called', () => {
      let country: Country;
      let updateCountryDto: UpdateCountryDto;
      beforeEach(async () => {
        updateCountryDto = {
          country: countryStub().country,
        };
        country = await countryController.update(
          '' + countryStub().id,
          updateCountryDto,
        );
      });
      test('then it should call countryService', () => {
        expect(countryService.update).toHaveBeenCalledWith(
          countryStub().id,
          updateCountryDto,
        );
      });
      test('then it should return booking', () => {
        expect(country).toEqual(countryStub());
      });
    });
  });
});
