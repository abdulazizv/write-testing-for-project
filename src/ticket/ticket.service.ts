import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket) private ticketRepository:typeof Ticket) { }

  async create(createTicketDto: CreateTicketDto) {
    return await this.ticketRepository.create(createTicketDto);
  }

  async findAll() {
    return await this.ticketRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.ticketRepository.findByPk(+id);
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const check = await this.ticketRepository.findByPk(id)
    if(!check){
        throw new HttpException(
            'Id is incorrect',
            HttpStatus.BAD_REQUEST
        )
    }
    const newTicket = await this.ticketRepository.update({
        ...updateTicketDto
    },{where:{id:id},returning:true})
    return newTicket
  }

  async remove(id: number) {
    return await this.ticketRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
