import { Controller, Get, Post, Body, Patch, Param, Delete,UploadedFile, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Event } from './event.model';
import {FileInterceptor} from '@nestjs/platform-express'
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({summary:"Event post qilish"})
  @ApiResponse({status:201,type:Event})
  @UseInterceptors(FileInterceptor('photo'))
  @Post()
  create(@Body() createEventDto: CreateEventDto,@UploadedFile() photo:any) {
    return this.eventService.create(createEventDto,photo);
  }

  @ApiOperation({summary:"Eventlarni get qilish"})
  @ApiResponse({status:200,type:[Event]})
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({summary:"Eventni get qilish"})
  @ApiResponse({status:200,type:Event})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @ApiOperation({summary:"Event patch qilish"})
  @ApiResponse({status:202,type:Event})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @ApiOperation({summary:"Event delete qilish"})
  @ApiResponse({status:203,type:Event})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
