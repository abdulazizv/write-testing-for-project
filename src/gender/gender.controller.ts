import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './gender.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @ApiOperation({summary:"Genderni post qilish"})
  @ApiResponse({status:201,type:Gender})
  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @ApiOperation({summary:"Genderlarni get qilish"})
  @ApiResponse({status:200,type:[Gender]})
  @Get()
  findAll() {
    return this.genderService.findAll();
  }

  @ApiOperation({summary:"Genderni get qilish"})
  @ApiResponse({status:200,type:Gender})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genderService.findOne(+id);
  }

  @ApiOperation({summary:"Genderni put qilish"})
  @ApiResponse({status:202,type:Gender})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.genderService.update(+id, updateGenderDto);
  }

  @ApiOperation({summary:"Genderni delete qilish"})
  @ApiResponse({status:203,type:Gender})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genderService.remove(+id);
  }
}
