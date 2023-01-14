import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './status.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({summary:"Statusni post qilish"})
  @ApiResponse({status:201,type:Status})
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({summary:"Statuslarni get qilish"})
  @ApiResponse({status:200,type:Status})
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @ApiOperation({summary:"Statusni get qilish"})
  @ApiResponse({status:200,type:Status})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @ApiOperation({summary:"Statusni put qilish"})
  @ApiResponse({status:202,type:Status})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @ApiOperation({summary:"Statusni delete qilish"})
  @ApiResponse({status:203,type:Status})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
