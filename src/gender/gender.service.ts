import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './gender.model';

@Injectable()
export class GenderService {
  constructor(@InjectModel(Gender) private genderRepository:typeof Gender) { }

  async create(createGenderDto: CreateGenderDto) {
    return await this.genderRepository.create(createGenderDto);
  }

  async findAll() {
    return await this.genderRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.genderRepository.findByPk(+id);
  }

  async update(id: number, updateGenderDto: UpdateGenderDto) {
    const check = await this.genderRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newGender = await this.genderRepository.update({
            ...updateGenderDto
        },{where:{id:id},returning:true})
        return newGender
  }

  async remove(id: number) {
    return await this.genderRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
