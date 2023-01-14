import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './region.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({summary:"Regionni post qilish"})
  @ApiResponse({status:201,type:Region})
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({summary:"Regionlarni get qilish"})
  @ApiResponse({status:200,type:[Region]})
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({summary:"Regionni get qilish"})
  @ApiResponse({status:200,type:Region})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({summary:"Regionni put qilish"})
  @ApiResponse({status:202,type:Region})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({summary:"Regionni delete qilish"})
  @ApiResponse({status:203,type:Region})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
