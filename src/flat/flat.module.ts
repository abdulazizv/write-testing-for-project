import { Module } from '@nestjs/common';
import { FlatService } from './flat.service';
import { FlatController } from './flat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Flat } from './flat.model';

@Module({
  imports:[SequelizeModule.forFeature([Flat])],
  controllers: [FlatController],
  providers: [FlatService]
})
export class FlatModule {}
