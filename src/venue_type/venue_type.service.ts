import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { VenueType } from './venue_type.model';

@Injectable()
export class VenueTypeService {
  constructor(@InjectModel(VenueType) private venuetypeRepository: typeof VenueType ) { }
  
  async create(createVenueTypeDto: CreateVenueTypeDto) {
    return await this.venuetypeRepository.create(createVenueTypeDto);
  }

  async findAll() {
    return await this.venuetypeRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.venuetypeRepository.findByPk(+id);
  }

  async update(id: number, updateVenueTypeDto: UpdateVenueTypeDto) {
    const check = await this.venuetypeRepository.findByPk(id)
    if(!check){
        throw new HttpException(
            'Id is incorrect',
            HttpStatus.BAD_REQUEST
        )
    }
    const newVenueType = await this.venuetypeRepository.update({
        ...updateVenueTypeDto
    },{where:{id:id},returning:true})
    return newVenueType 
  }

  async remove(id: number) {
    return await this.venuetypeRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
