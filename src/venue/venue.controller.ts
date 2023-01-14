import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './venue.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @ApiOperation({summary:"Venueni post qilish"})
  @ApiResponse({status:201,type:Venue})
  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @ApiOperation({summary:"Venuelarni get qilish"})
  @ApiResponse({status:200,type:Venue})
  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @ApiOperation({summary:"Venueni get qilish"})
  @ApiResponse({status:200,type:Venue})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }

  @ApiOperation({summary:"Venueni patch qilish"})
  @ApiResponse({status:202,type:Venue})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(+id, updateVenueDto);
  }

  @ApiOperation({summary:"Venueni delete qilish"})
  @ApiResponse({status:203,type:Venue})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(+id);
  }
}
