import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';
import { EventType } from './event_type.model';

@Injectable()
export class EventTypeService {
  constructor(@InjectModel(EventType) private eventRepository:typeof EventType) { }
  
  async create(createEventTypeDto: CreateEventTypeDto) {
    return await this.eventRepository.create(createEventTypeDto);
  }

  async findAll() {
    return await this.eventRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.eventRepository.findByPk(+id);
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    const check = await this.eventRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newDistrict = await this.eventRepository.update({
            ...updateEventTypeDto
        },{where:{id:id},returning:true})
        return newDistrict
  }

  async remove(id: number) {
    return await this.eventRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
