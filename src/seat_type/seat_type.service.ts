import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { SeatType } from './seat_type.model';

@Injectable()
export class SeatTypeService {
  constructor(@InjectModel(SeatType) private seatTypeRepository: typeof SeatType) { }

  async create(createSeatTypeDto: CreateSeatTypeDto) {
    return await this.seatTypeRepository.create(createSeatTypeDto);
  }

  async findAll() {
    return await this.seatTypeRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.seatTypeRepository.findByPk(+id);
  }

  async update(id: number, updateSeatTypeDto: UpdateSeatTypeDto) {
    const check = await this.seatTypeRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newSeatType = await this.seatTypeRepository.update({
            ...updateSeatTypeDto
        },{where:{id:id},returning:true})
        return newSeatType
  }

  async remove(id: number) {
    return await this.seatTypeRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
