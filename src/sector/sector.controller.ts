import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector } from './sector.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @ApiOperation({summary:"Sectorni post qilish"})
  @ApiResponse({status:201,type:Sector})
  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorService.create(createSectorDto);
  }

  @ApiOperation({summary:"Sectorlarni get qilish"})
  @ApiResponse({status:200,type:[Sector]})
  @Get()
  findAll() {
    return this.sectorService.findAll();
  }

  @ApiOperation({summary:"Sectorni get qilish"})
  @ApiResponse({status:200,type:Sector})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectorService.findOne(+id);
  }

  @ApiOperation({summary:"Sectorni patch qilish"})
  @ApiResponse({status:202,type:Sector})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    return this.sectorService.update(+id, updateSectorDto);
  }

  @ApiOperation({summary:"Sectorni delete qilish"})
  @ApiResponse({status:203,type:Sector})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectorService.remove(+id);
  }
}
