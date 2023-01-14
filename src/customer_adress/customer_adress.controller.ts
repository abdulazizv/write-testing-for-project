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
import { CustomerAdress } from './customer_adress.model';
import { CustomerAdressService } from './customer_adress.service';
import { CreateCustomerAdressDto } from './dto/create-customer_adress.dto';
import { UpdateCustomerAdressDto } from './dto/update-customer_adress.dto';

@Controller('customer-adress')
export class CustomerAdressController {
  constructor(private readonly customerAdressService: CustomerAdressService) {}

  @ApiOperation({ summary: 'Customer_adress post qilish' })
  @ApiResponse({ status: 201, type: CustomerAdress })
  @Post()
  create(@Body() createCustomerAdressDto: CreateCustomerAdressDto) {
    return this.customerAdressService.create(createCustomerAdressDto);
  }

  @ApiOperation({ summary: 'Customer_adresslarni get qilish' })
  @ApiResponse({ status: 200, type: [CustomerAdress] })
  @Get()
  findAll() {
    return this.customerAdressService.findAll();
  }

  @ApiOperation({ summary: 'Customer_adress get qilish' })
  @ApiResponse({ status: 200, type: CustomerAdress })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerAdressService.findOne(+id);
  }

  @ApiOperation({ summary: 'Customer_adress patch qilish' })
  @ApiResponse({ status: 202, type: CustomerAdress })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerAdressDto: UpdateCustomerAdressDto,
  ) {
    return this.customerAdressService.update(+id, updateCustomerAdressDto);
  }

  @ApiOperation({ summary: 'Customer_adress delete qilish' })
  @ApiResponse({ status: 203, type: CustomerAdress })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerAdressService.delete(+id);
  }
}
