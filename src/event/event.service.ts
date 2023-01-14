import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private eventRepository: typeof Event,
    private readonly fileService: FilesService) { }
  async create(createEventDto: CreateEventDto,photo:any) {
    const fileName = await this.fileService.createFile(photo);
    // console.log(createEventDto.description)
    const event = await this.eventRepository.create({
      ...createEventDto,
      photo:fileName
    })
    event.save()
    if (!event) {
      throw new BadRequestException('eventni qo`shish jarayonida hatolik');
    }
    return event;
  }

  async findAll() {
    return await this.eventRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.eventRepository.findByPk(+id);
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const check = await this.eventRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newDistrict = await this.eventRepository.update({
            ...updateEventDto
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
