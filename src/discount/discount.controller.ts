import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { Discount } from './discount_model';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @ApiOperation({ summary: 'Discountlarni patch qilish' })
  @ApiResponse({ status: 201, type: Discount })
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: 'Discountlarni get qilish' })
  @ApiResponse({ status: 200, type: [Discount] })
  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @ApiOperation({ summary: 'Discount get qilish' })
  @ApiResponse({ status: 200, type: Discount })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @ApiOperation({ summary: 'Discount patch qilish' })
  @ApiResponse({ status: 202, type: Discount })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @ApiOperation({ summary: 'Discount delete qilish' })
  @ApiResponse({ status: 203, type: Discount })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.discountService.delete(+id);
  }
}
