import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeliveryMethod } from './delivery_method.model';
import { CreateDeliveryMethodDto } from './dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery_method.dto';

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(DeliveryMethod)
    private deliverymethodRepository: typeof DeliveryMethod,
  ) {}

  async create(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return await this.deliverymethodRepository.create(createDeliveryMethodDto);
  }

  async findAll() {
    return await this.deliverymethodRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.deliverymethodRepository.findByPk(+id);
  }

  async update(id: number, updateDeliveryMethodDto: UpdateDeliveryMethodDto) {
    const check = await this.deliverymethodRepository.findByPk(id);
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.BAD_REQUEST);
    }
    const newCustomer = await this.deliverymethodRepository.update(
      {
        ...updateDeliveryMethodDto,
      },
      { where: { id: id }, returning: true },
    );
    return check;
  }

  async delete(id: number) {
    await this.deliverymethodRepository.destroy({
      where: {
        id: +id,
      },
    });
    return true;
  }
}
