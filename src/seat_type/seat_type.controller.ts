import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatTypeService } from './seat_type.service';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { SeatType } from './seat_type.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('seat-type')
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @ApiOperation({summary:"SeatTypeni post qilish"})
  @ApiResponse({status:201,type:SeatType})
  @Post()
  create(@Body() createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeService.create(createSeatTypeDto);
  }

  @ApiOperation({summary:"SeatTypelarni get qilish"})
  @ApiResponse({status:200,type:[SeatType]})
  @Get()
  findAll() {
    return this.seatTypeService.findAll();
  }

  @ApiOperation({summary:"SeatTypeni get qilish"})
  @ApiResponse({status:200,type:SeatType})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatTypeService.findOne(+id);
  }

  @ApiOperation({summary:"SeatTypeni put qilish"})
  @ApiResponse({status:202,type:SeatType})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatTypeDto: UpdateSeatTypeDto) {
    return this.seatTypeService.update(+id, updateSeatTypeDto);
  }

  @ApiOperation({summary:"SeatTypeni delete qilish"})
  @ApiResponse({status:203,type:SeatType})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatTypeService.remove(+id);
  }
}
