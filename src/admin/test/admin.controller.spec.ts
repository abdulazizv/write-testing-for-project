import { AdminController } from '../admin.controller';
import { AdminService } from '../admin.service';
import { Test } from '@nestjs/testing';
import { adminStub } from './stubs/admin.stub';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin.model';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';

jest.mock('../admin.service');
describe('Admin Controller', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: {
            create: jest.fn().mockResolvedValue(adminStub()),
            findAll: jest.fn().mockResolvedValue([adminStub()]),
            findOne: jest.fn().mockResolvedValue(adminStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(adminStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    adminController = moduleRef.get<AdminController>(AdminController);
    adminService = moduleRef.get<AdminService>(AdminService);
    jest.clearAllMocks();
  });
  it('should be defined adminController', () => {
    expect(adminController).toBeDefined();
  });
  it('should be defined adminService', () => {
    expect(adminService).toBeDefined();
  });
  describe('createAdmin', () => {
    describe('when createAdmin is called', () => {
      let admin: Admin;
      let createadminDto: CreateAdminDto;
      beforeEach(async () => {
        createadminDto = {
          name: adminStub().name,
          login: adminStub().login,
          hashed_password: adminStub().hashed_password,
        };
        admin = await adminController.create(createadminDto);
      });
      test('then it should call adminService', () => {
        expect(adminService.create).toBeCalledWith(createadminDto);
      });
      test('then it should return admin', () => {
        expect(admin).toEqual(adminStub());
      });
    });
  });
  describe('getAll admin', () => {
    describe('when getAll is called', () => {
      let admin: Admin[];
      beforeEach(async () => {
        admin = await adminController.findAll();
      });
      test('then it should call adminService', () => {
        expect(adminService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return admin', () => {
        expect(admin).toEqual([adminStub()]);
      });
    });
  });
  describe('getOne admin', () => {
    describe('when getOne is called', () => {
      let admin: Admin;
      beforeEach(async () => {
        admin = await adminController.findOne(adminStub().id);
      });
      test('then it should call adminService', () => {
        expect(adminService.findOne).toHaveBeenCalledWith(adminStub().id);
      });
      test('then it should return admin', () => {
        expect(admin).toEqual(adminStub());
      });
    });
  });
  describe('delete Admin', () => {
    describe('when deleteAdmin is called', () => {
      let admin: boolean;
      beforeEach(async () => {
        admin = await adminController.delete(adminStub().id);
      });
      test('then it should call adminService', () => {
        expect(adminService.delete).toHaveBeenCalledWith(adminStub().id);
      });
      test('then it should return admin', () => {
        expect(admin).toEqual(true);
      });
    });
  });
  describe('update Admin', () => {
    describe('when updateAdmin is called', () => {
      let admin: Admin;
      let updateAdminDto: UpdateAdminDto;
      beforeEach(async () => {
        updateAdminDto = {
          name: adminStub().name,
          login: adminStub().login,
          hashed_password: adminStub().hashed_password,
        };
        admin = await adminController.update(adminStub().id, updateAdminDto);
      });
      test('then it should call adminService', () => {
        expect(adminService.update).toHaveBeenCalledWith(
          adminStub().id,
          updateAdminDto,
        );
      });
      test('then it should return admin', () => {
        expect(admin).toEqual(adminStub());
      });
    });
  });
});
