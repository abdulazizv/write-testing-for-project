import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueTypeService } from './venue_type.service';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { VenueType } from './venue_type.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('venue-type')
export class VenueTypeController {
  constructor(private readonly venueTypeService: VenueTypeService) {}

  @ApiOperation({summary:"Venuetypeni post qilish"})
  @ApiResponse({status:201,type:VenueType})
  @Post()
  create(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeService.create(createVenueTypeDto);
  }

  @ApiOperation({summary:"Venuetypelarni get qilish"})
  @ApiResponse({status:200,type:[VenueType]})
  @Get()
  findAll() {
    return this.venueTypeService.findAll();
  }

  @ApiOperation({summary:"Venuetypeni get qilish"})
  @ApiResponse({status:200,type:VenueType})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueTypeService.findOne(+id);
  }

  @ApiOperation({summary:"Venuetypeni patch qilish"})
  @ApiResponse({status:202,type:VenueType})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueTypeDto: UpdateVenueTypeDto) {
    return this.venueTypeService.update(+id, updateVenueTypeDto);
  }

  @ApiOperation({summary:"Venuetypeni delete qilish"})
  @ApiResponse({status:203,type:VenueType})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueTypeService.remove(+id);
  }
}
