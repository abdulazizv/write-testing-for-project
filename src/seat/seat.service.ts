import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './seat.model';

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat) private seatRepository:typeof Seat) { }

  async create(createSeatDto: CreateSeatDto) {
    return await this.seatRepository.create(createSeatDto);
  }

  async findAll() {
    return await this.seatRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.seatRepository.findByPk(+id)
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    const check = await this.seatRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newSeat = await this.seatRepository.update({
            ...updateSeatDto
        },{where:{id:id},returning:true})
        return newSeat
  }

  async remove(id: number) {
    return await this.seatRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
