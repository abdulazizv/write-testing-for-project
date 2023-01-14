import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Gender } from './gender.model';

@Module({
  imports:[SequelizeModule.forFeature([Gender])],
  controllers: [GenderController],
  providers: [GenderService]
})
export class GenderModule {}
