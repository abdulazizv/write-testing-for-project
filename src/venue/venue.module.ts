import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Venue } from './venue.model';

@Module({
  imports:[SequelizeModule.forFeature([Venue])],
  controllers: [VenueController],
  providers: [VenueService]
})
export class VenueModule {}
