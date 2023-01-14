import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlatService } from './flat.service';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Flat } from './flat.model';

@Controller('flat')
export class FlatController {
  constructor(private readonly flatService: FlatService) {}


  @ApiOperation({summary:"Flat post qilish"})
  @ApiResponse({status:201,type:Flat})
  @Post()
  create(@Body() createFlatDto: CreateFlatDto) {
    return this.flatService.create(createFlatDto);
  }

  @ApiOperation({summary:"Flatlarni get qilish"})
  @ApiResponse({status:200,type:[Flat]})
  @Get()
  findAll() {
    return this.flatService.findAll();
  }

  @ApiOperation({summary:"Flatni get qilish"})
  @ApiResponse({status:200,type:Flat})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flatService.findOne(+id);
  }

  @ApiOperation({summary:"Flatni update qilish"})
  @ApiResponse({status:202,type:Flat})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlatDto: UpdateFlatDto) {
    return this.flatService.update(+id, updateFlatDto);
  }

  @ApiOperation({summary:"Flatni delete qilish"})
  @ApiResponse({status:203,type:Flat})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flatService.remove(+id);
  }
}
