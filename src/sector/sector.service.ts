import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector } from './sector.model';

@Injectable()
export class SectorService {
  constructor(@InjectModel(Sector) private sectorRepository:typeof Sector) { }
  
  async create(createSectorDto: CreateSectorDto) {
    return await this.sectorRepository.create(createSectorDto);
  }

  async findAll() {
    return await this.sectorRepository.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    return await this.sectorRepository.findByPk(+id);
  }

  async update(id: number, updateSectorDto: UpdateSectorDto) {
    return await this.sectorRepository.update({...updateSectorDto},{
      where:{
        id:id
      }
    });
  }

  async remove(id: number) {
    return await this.sectorRepository.destroy({
      where:{
        id:+id
      }
    });
  }
}
