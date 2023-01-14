import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { Test } from '@nestjs/testing';
import { cartStub } from './stubs/cart.stub';
import { JwtService } from '@nestjs/jwt';
import { Cart } from '../cart.model';
import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';

jest.mock('../cart.service');
describe('cart controller', () => {
  let cartController: CartController;
  let cartService: CartService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: {
            create: jest.fn().mockResolvedValue(cartStub()),
            findAll: jest.fn().mockResolvedValue([cartStub()]),
            findOne: jest.fn().mockResolvedValue(cartStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(cartStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();
    cartController = moduleRef.get<CartController>(CartController);
    cartService = moduleRef.get<CartService>(CartService);
    jest.clearAllMocks();
  });
  it('it should be defined cartController', () => {
    expect(cartController).toBeDefined();
  });
  it('it should be defined cartService', () => {
    expect(cartService).toBeDefined();
  });
  describe('create Cart', () => {
    describe('when createCart is called', () => {
      let cart: Cart;
      let createCartDto: CreateCartDto;
      beforeEach(async () => {
        createCartDto = {
          ticket_id: cartStub().ticket_id,
          customer_id: cartStub().customer_id,
          status_id: cartStub().status_id,
        };
        cart = await cartController.create(createCartDto);
      });
      test('then it should call cartService', () => {
        expect(cartService.create).toBeCalledWith(createCartDto);
      });
      test('then it should return cart', () => {
        expect(cart).toEqual(cartStub());
      });
    });
  });
  describe('getAll carts', () => {
    describe('when getAll cart is called', () => {
      let cart: Cart[];
      beforeEach(async () => {
        cart = await cartController.findAll();
      });
      test('then it should call cartService', () => {
        expect(cartService.findAll).toHaveBeenCalledWith();
      });
      test('then it should return cart', () => {
        expect(cart).toEqual([cartStub()]);
      });
    });
  });
  describe('getOne cart', () => {
    describe('when findone is called', () => {
      let cart: Cart;
      beforeEach(async () => {
        cart = await cartController.findOne(cartStub().id);
      });
      test('then it should call cartService', () => {
        expect(cartService.findOne).toHaveBeenCalledWith(cartStub().id);
      });
      test('then it should return cart', () => {
        expect(cart).toEqual(cartStub());
      });
    });
  });
  describe('delete Cart', () => {
    describe('when deleteCart is called', () => {
      let cart: boolean;
      beforeEach(async () => {
        cart = await cartController.delete('' + cartStub().id);
      });
      test('then it should call cartService', () => {
        expect(cartService.delete).toBeCalledWith(cartStub().id);
      });
      test('then it should return cart', () => {
        expect(cart).toEqual(true);
      });
    });
  });
  describe('update cart', () => {
    describe('when updateOneCart is called', () => {
      let cart: Cart;
      let updateCartDto: UpdateCartDto;
      beforeEach(async () => {
        updateCartDto = {
          ticket_id: cartStub().ticket_id,
          customer_id: cartStub().customer_id,
          status_id: cartStub().status_id,
        };
        cart = await cartController.update('' + cartStub().id, updateCartDto);
      });
      test('then it should call cartService', () => {
        expect(cartService.update).toHaveBeenCalledWith(
          cartStub().id,
          updateCartDto,
        );
      });
      test('then it should return cart', () => {
        expect(cart).toEqual(cartStub());
      });
    });
  });
});
