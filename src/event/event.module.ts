import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports:[SequelizeModule.forFeature([Event]),FilesModule],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
