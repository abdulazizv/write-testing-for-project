import { Controller, Get, Post, Body, Patch, Param, Delete,Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { District } from './district.model';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}


  @ApiOperation({summary:"District post qilish"})
  @ApiResponse({status:200,type:District})
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({summary:"District get qilish"})
  @ApiResponse({status:200,type:[District]})
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({summary:"District get qilish"})
  @ApiResponse({status:202,type:District})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({summary:"District put qilish"})
  @ApiResponse({status:202,type:District})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({summary:"District delete qilish"})
  @ApiResponse({status:203,type:District})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
