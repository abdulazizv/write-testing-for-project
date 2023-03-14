import { All, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerCard } from './customer_card.model';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard)
    private customercardRepository: typeof CustomerCard,
  ) {}

  async create(createCustomerCardDto: CreateCustomerCardDto) {
    const card = await this.customercardRepository.create(
      createCustomerCardDto,
    );
    return card;
  }

  async activateCard(id: number): Promise<boolean> {
    const card = await this.customercardRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!card) {
      throw new HttpException('Card topilmadi', HttpStatus.NOT_FOUND);
    }
    card.is_active = true;
    return true;
  }

  async deActivateCard(id: number): Promise<boolean> {
    const card = await this.customercardRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!card) {
      throw new HttpException('Card is not found', HttpStatus.NOT_FOUND);
    }
    card.is_active = false;
    return true;
  }

  async mainCard(id: number, cardId: number): Promise<CustomerCard[]> {
    const customCard = await this.customercardRepository.findAll({
      where: {
        customer_id: id,
      },
    });
    if (!customCard)
      throw new HttpException(
        'CustomerCard is not found',
        HttpStatus.NOT_FOUND,
      );
    if (customCard.length < 2) {
      for (const x of customCard) {
        if (x.dataValues.id == cardId) {
          x.dataValues.is_main = true;
        }
        return customCard;
      }
    }
    for (const x of customCard) {
      if (x.dataValues.id == cardId && x.dataValues.is_main == false) {
        x.dataValues.is_main = true;
      }
    }
    return customCard;
  }
  async findAll() {
    return await this.customercardRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.customercardRepository.findByPk(+id);
  }

  async update(id: number, updateCustomerCardDto: UpdateCustomerCardDto) {
    const check = await this.customercardRepository.findByPk(id);
    if (!check) {
      throw new HttpException('Id is incorrect', HttpStatus.BAD_REQUEST);
    }
    const newCustomer = await this.customercardRepository.update(
      {
        ...updateCustomerCardDto,
      },
      { where: { id: id }, returning: true },
    );
    return check;
  }

  async delete(id: number) {
    await this.customercardRepository.destroy({
      where: {
        id: +id,
      },
    });
    return true;
  }
}
