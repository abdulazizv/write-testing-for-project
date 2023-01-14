import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sector } from './sector.model';

@Module({
  imports:[SequelizeModule.forFeature([Sector])],
  controllers: [SectorController],
  providers: [SectorService]
})
export class SectorModule {}
