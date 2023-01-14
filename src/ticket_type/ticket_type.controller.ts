import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketTypeService } from './ticket_type.service';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket_type.dto';
import { TicketType } from './ticket_type.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('ticket-type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @ApiOperation({summary:"Tickettypeni post qilish"})
  @ApiResponse({status:201,type:TicketType})
  @Post()
  create(@Body() createTicketTypeDto: CreateTicketTypeDto) {
    return this.ticketTypeService.create(createTicketTypeDto);
  }

  @ApiOperation({summary:"Tickettypelarni get qilish"})
  @ApiResponse({status:200,type:[TicketType]})
  @Get()
  findAll() {
    return this.ticketTypeService.findAll();
  }

  @ApiOperation({summary:"Tickettypeni get qilish"})
  @ApiResponse({status:200,type:TicketType})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketTypeService.findOne(+id);
  }

  @ApiOperation({summary:"Tickettypeni update qilish"})
  @ApiResponse({status:202,type:TicketType})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketTypeDto: UpdateTicketTypeDto) {
    return this.ticketTypeService.update(+id, updateTicketTypeDto);
  }

  @ApiOperation({summary:"Tickettypeni delete qilish"})
  @ApiResponse({status:203,type:TicketType})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketTypeService.remove(+id);
  }
}
