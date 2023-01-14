import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { HumanCategory } from './human_category.model';

@Injectable()
export class HumanCategoryService {
  constructor(@InjectModel(HumanCategory) private humanCategoryRepository: typeof HumanCategory) { }
  
  async create(createHumanCategoryDto: CreateHumanCategoryDto) {
    return await this.humanCategoryRepository.create(createHumanCategoryDto);
  }

  async findAll() {
    return await this.humanCategoryRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.humanCategoryRepository.findByPk(+id);
  }

  async update(id: number, updateHumanCategoryDto: UpdateHumanCategoryDto) {
    const check = await this.humanCategoryRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newGender = await this.humanCategoryRepository.update({
            ...updateHumanCategoryDto
        },{where:{id:id},returning:true})
        return newGender
  }

  async remove(id: number) {
    return await this.humanCategoryRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
