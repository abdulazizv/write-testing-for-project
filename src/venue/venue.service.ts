import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './venue.model';

@Injectable()
export class VenueService {
  constructor(@InjectModel(Venue) private venueRepository:typeof Venue)  { }

  async create(createVenueDto: CreateVenueDto) {
    return await this.venueRepository.create(createVenueDto);
  }

  async findAll() {
    return await this.venueRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.venueRepository.findByPk(+id);
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    const check = await this.venueRepository.findByPk(id)
    if(!check){
        throw new HttpException(
            'Id is incorrect',
            HttpStatus.BAD_REQUEST
        )
    }
    const newVenue = await this.venueRepository.update({
        ...updateVenueDto
    },{where:{id:id},returning:true})
    return newVenue 
  }

  async remove(id: number) {
    return await this.venueRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
