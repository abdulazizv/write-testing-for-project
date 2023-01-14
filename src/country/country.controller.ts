import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { isCreatorGuard } from '../common/guards/isCreatorOrId.guard';
import { Country } from './country.model';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOperation({ summary: "Country qo'shish" })
  @ApiResponse({ status: 201, type: Country })
  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @ApiOperation({ summary: 'Countrylarni olish' })
  @ApiResponse({ status: 200, type: [Country] })
  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @ApiOperation({ summary: 'Country olish' })
  @ApiResponse({ status: 200, type: Country })
  @UseGuards(isCreatorGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Countryni update qilish' })
  @ApiResponse({ status: 202, type: Country })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @ApiOperation({ summary: 'Country delete qilish' })
  @ApiResponse({ status: 203, type: Country })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.countryService.delete(+id);
  }
}
