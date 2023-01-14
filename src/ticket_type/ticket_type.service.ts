import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket_type.dto';
import { TicketType } from './ticket_type.model';

@Injectable()
export class TicketTypeService {
  constructor(@InjectModel(TicketType) private tickettypeRepository:typeof TicketType) { }
  
  async create(createTicketTypeDto: CreateTicketTypeDto) {
    return await this.tickettypeRepository.create(createTicketTypeDto)
  }

  async findAll() {
    return await this.tickettypeRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.tickettypeRepository.findByPk(+id);
  }

  async update(id: number, updateTicketTypeDto: UpdateTicketTypeDto) {
    const check = await this.tickettypeRepository.findByPk(id)
    if(!check){
        throw new HttpException(
            'Id is incorrect',
            HttpStatus.BAD_REQUEST
        )
    }
    const newTicket = await this.tickettypeRepository.update({
        ...updateTicketTypeDto
    },{where:{id:id},returning:true})
    return newTicket
  }

  async remove(id: number) {
    return await this.tickettypeRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
