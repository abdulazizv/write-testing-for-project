import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventTypeService } from './event_type.service';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';
import { ApiOperation,ApiResponse } from '@nestjs/swagger';
import { EventType } from './event_type.model';

@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @ApiOperation({summary:"Event-type post qilish"})
  @ApiResponse({status:201,type:EventType})
  @Post()
  create(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }

  @ApiOperation({summary:"Event-typelarni get qilish"})
  @ApiResponse({status:200,type:[EventType]})
  @Get()
  findAll() {
    return this.eventTypeService.findAll();
  }

  @ApiOperation({summary:"Event-type get qilish"})
  @ApiResponse({status:200,type:EventType})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTypeService.findOne(+id);
  }

  @ApiOperation({summary:"Event-type put qilish"})
  @ApiResponse({status:202,type:EventType})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventTypeDto: UpdateEventTypeDto) {
    return this.eventTypeService.update(+id, updateEventTypeDto);
  }

  @ApiOperation({summary:"Event-type delete qilish"})
  @ApiResponse({status:203,type:EventType})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTypeService.remove(+id);
  }
}
