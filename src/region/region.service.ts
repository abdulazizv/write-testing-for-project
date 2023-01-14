import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepository:typeof Region) { }

  async create(createRegionDto: CreateRegionDto) {
    return await this.regionRepository.create(createRegionDto);
  }

  async findAll() {
    return await this.regionRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.regionRepository.findByPk(+id);
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const check = await this.regionRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newPaymentMethod = await this.regionRepository.update({
            ...updateRegionDto
        },{where:{id:id},returning:true})
        return newPaymentMethod
  }

  async remove(id: number) {
    return await this.regionRepository.destroy({
      where:{
        id:+id
      }
    })
  }
}
