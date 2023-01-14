import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './payment_method.model';

@Injectable()
export class PaymentMethodService {
  constructor(@InjectModel(PaymentMethod) private paymentmethodRepository: typeof PaymentMethod) { }
  
  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    return await this.paymentmethodRepository.create(createPaymentMethodDto)
  }

  async findAll() {
    return await this.paymentmethodRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.paymentmethodRepository.findByPk(+id);
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const check = await this.paymentmethodRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newPaymentMethod = await this.paymentmethodRepository.update({
            ...updatePaymentMethodDto
        },{where:{id:id},returning:true})
        return newPaymentMethod
  }

  async remove(id: number) {
    return await this.paymentmethodRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
