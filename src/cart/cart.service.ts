import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartRepository: typeof Cart) {}

  async create(createCartDto: CreateCartDto) {
    return await this.cartRepository.create(createCartDto);
  }

  async findAll() {
    return await this.cartRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.cartRepository.findByPk(+id);
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const check = await this.cartRepository.findByPk(id);
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.BAD_REQUEST);
    }
    const newCart = await this.cartRepository.update(
      {
        ...updateCartDto,
      },
      { where: { id: id }, returning: true },
    );
    return check;
  }

  async delete(id: number) {
    await this.cartRepository.destroy({
      where: {
        id: +id,
      },
    });
    return true
  }
}
