import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {ApiOperation,ApiResponse} from '@nestjs/swagger'
import { Ticket } from './ticket.model';
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({summary:"Ticketni post qilish"})
  @ApiResponse({status:201,type:Ticket})
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @ApiOperation({summary:"Ticketlarni get qilish"})
  @ApiResponse({status:200,type:[Ticket]})
  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @ApiOperation({summary:"Ticketni get qilish"})
  @ApiResponse({status:200,type:Ticket})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @ApiOperation({summary:"Ticketni update qilish"})
  @ApiResponse({status:202,type:Ticket})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @ApiOperation({summary:"Ticketni delete qilish"})
  @ApiResponse({status:203,type:Ticket})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
