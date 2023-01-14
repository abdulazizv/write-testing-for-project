import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './language.model';
import { ApiOperation,ApiResponse } from '@nestjs/swagger';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({summary:"Languageni post qilish"})
  @ApiResponse({status:201,type:Language})
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @ApiOperation({summary:"Languagelarni get qilish"})
  @ApiResponse({status:200,type:[Language]})
  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @ApiOperation({summary:"Languageni get qilish"})
  @ApiResponse({status:200,type:Language})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @ApiOperation({summary:"Languageni put qilish"})
  @ApiResponse({status:202,type:Language})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @ApiOperation({summary:"Languageni delete qilish"})
  @ApiResponse({status:203,type:Language})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
