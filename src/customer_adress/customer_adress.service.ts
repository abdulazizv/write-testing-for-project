import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerAdress } from './customer_adress.model';
import { CreateCustomerAdressDto } from './dto/create-customer_adress.dto';
import { UpdateCustomerAdressDto } from './dto/update-customer_adress.dto';

@Injectable()
export class CustomerAdressService {
  constructor(@InjectModel(CustomerAdress) private customeraddressRepository:typeof CustomerAdress) { }
  async create(createCustomerAdressDto: CreateCustomerAdressDto) {
    return await this.customeraddressRepository.create(createCustomerAdressDto);
  }

  async findAll() {
    return await this.customeraddressRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.customeraddressRepository.findByPk(+id);
  }

  async update(id: number, updateCustomerAdressDto: UpdateCustomerAdressDto) {
    const check = await this.customeraddressRepository.findByPk(id)
    if(!check){
        throw new HttpException(
            'Id is incorrect',
            HttpStatus.BAD_REQUEST
        )
    }
    const newCustomer = await this.customeraddressRepository.update({
        ...updateCustomerAdressDto
    },{where:{id:id},returning:true})
    return newCustomer;
  }

  async remove(id: number) {
    return await this.customeraddressRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
