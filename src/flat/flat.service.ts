import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { Flat } from './flat.model';

@Injectable()
export class FlatService {
  constructor(@InjectModel(Flat) private flatRepository:typeof Flat) { }

  async create(createFlatDto: CreateFlatDto) {
    return await this.flatRepository.create(createFlatDto);
  }

  async findAll() {
    return await this.flatRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.flatRepository.findByPk(+id);
  }

  async update(id: number, updateFlatDto: UpdateFlatDto) {
    const check = await this.flatRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newDistrict = await this.flatRepository.update({
            ...updateFlatDto
        },{where:{id:id},returning:true})
        return newDistrict
  }

  async remove(id: number) {
    return await this.flatRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
