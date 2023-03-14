import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomerCard } from './customer_card.model';
import { CustomerCardService } from './customer_card.service';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';

@Controller('customer-card')
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @ApiOperation({ summary: 'Customer_card post qilish' })
  @ApiResponse({ status: 201, type: CustomerCard })
  @Post()
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @ApiOperation({ summary: 'Customer_card get qilish' })
  @ApiResponse({ status: 200, type: [CustomerCard] })
  @Get()
  findAll() {
    return this.customerCardService.findAll();
  }

  @ApiOperation({ summary: 'Customer_card get qilish' })
  @ApiResponse({ status: 200, type: CustomerCard })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerCardService.findOne(+id);
  }

  @ApiOperation({ summary: 'Customer_card patch qilish' })
  @ApiResponse({ status: 202, type: CustomerCard })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    return this.customerCardService.update(+id, updateCustomerCardDto);
  }

  @ApiOperation({ summary: 'Customer_cardni asosiy qilish' })
  @ApiResponse({ status: 202, type: CustomerCard })
  @Put('/maincard/:id')
  maincard(@Param('id') id: number, @Body() cardId: number) {
    return this.customerCardService.mainCard(id, cardId);
  }
  @ApiOperation({ summary: 'Customer_cardni active qilish' })
  @ApiResponse({ status: 200, type: String })
  @Post('activate/:id')
  activateCard(@Param('id') id: number) {
    return this.customerCardService.activateCard(id);
  }
  @ApiOperation({ summary: 'Customer_card delete qilish' })
  @ApiResponse({ status: 203, type: CustomerCard })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerCardService.delete(+id);
  }
}
