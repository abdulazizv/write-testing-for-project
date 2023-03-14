import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discount } from './discount_model';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectModel(Discount) private discountRepository: typeof Discount,
  ) {}

  async create(createDiscountDto: CreateDiscountDto) {
    return await this.discountRepository.create(createDiscountDto);
  }

  async findAll() {
    return await this.discountRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.discountRepository.findByPk(+id);
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const check = await this.discountRepository.findByPk(id);
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.BAD_REQUEST);
    }
    const newCustomer = await this.discountRepository.update(
      {
        ...updateDiscountDto,
      },
      { where: { id: id }, returning: true },
    );
    return check;
  }

  async delete(id: number) {
    await this.discountRepository.destroy({
      where: {
        id: +id,
      },
    });
    return true
  }
}
