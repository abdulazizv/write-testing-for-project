import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './district.model';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepository: typeof District) {}

  async create(createDistrictDto: CreateDistrictDto) {
    return await this.districtRepository.create(createDistrictDto);
  }

  async findAll() {
    return await this.districtRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.districtRepository.findOne({
      where:{
        id:id
      }
    });
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const check = await this.districtRepository.findByPk(id)
        if(!check){
            throw new HttpException(
                'Id is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }
        const newDistrict = await this.districtRepository.update({
            ...updateDistrictDto
        },{where:{id:id},returning:true})
        return newDistrict
  }

  async remove(id: number) {
    return await this.districtRepository.destroy({
      where:{
        id:id
      }
    });
  }
}
