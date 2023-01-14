import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumanCategoryService } from './human_category.service';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HumanCategory } from './human_category.model';

@Controller('human-category')
export class HumanCategoryController {
  constructor(private readonly humanCategoryService: HumanCategoryService) {}

  @ApiOperation({summary:"HumanCategoryni post qilish"})
  @ApiResponse({status:201,type:HumanCategory})
  @Post()
  create(@Body() createHumanCategoryDto: CreateHumanCategoryDto) {
    return this.humanCategoryService.create(createHumanCategoryDto);
  }

  @ApiOperation({summary:"HumanCategorylarni get qilish"})
  @ApiResponse({status:200,type:[HumanCategory]})
  @Get()
  findAll() {
    return this.humanCategoryService.findAll();
  }

  @ApiOperation({summary:"HumanCategoryni get qilish"})
  @ApiResponse({status:200,type:HumanCategory})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humanCategoryService.findOne(+id);
  }

  @ApiOperation({summary:"HumanCategoryni update qilish"})
  @ApiResponse({status:202,type:HumanCategory})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumanCategoryDto: UpdateHumanCategoryDto) {
    return this.humanCategoryService.update(+id, updateHumanCategoryDto);
  }

  @ApiOperation({summary:"HumanCategoryni delete qilish"})
  @ApiResponse({status:203,type:HumanCategory})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humanCategoryService.remove(+id);
  }
}
