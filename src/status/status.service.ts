import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './status.model';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusRepository:typeof Status) { }

  async create(createStatusDto: CreateStatusDto) {
    return await this.statusRepository.create(createStatusDto);
  }

  async findAll() {
    return await this.statusRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.statusRepository.findByPk(+id);
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    const check = await this.statusRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newSeatType = await this.statusRepository.update({
            ...updateStatusDto
        },{where:{id:id},returning:true})
        return newSeatType
  }

  async remove(id: number) {
    return await this.statusRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
