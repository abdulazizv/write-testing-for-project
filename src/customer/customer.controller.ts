import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthDto } from '../admin/dto/auth.dto';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Response } from 'express';
import { customerGuard } from '../common/guards/customer.guard';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Customer } from './customer.model';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('signup')
  signup(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.customerService.signup(authDto, res);
  }

  @Post('signin')
  signin(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.customerService.signin(authDto, res);
  }
  @Post('logout/:id')
  @HttpCode(HttpStatus.OK)
  logout(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
    return this.customerService.logout(id, res);
  }

  @UseGuards(customerGuard)
  @Post('refresh/:id')
  async refreshToken(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.refreshTokens(id, res);
  }

  @ApiOperation({ summary: 'Customer post qilish' })
  @ApiResponse({ status: 201, type: Customer })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @ApiOperation({ summary: 'Customerlarni get qilish' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'Customerni olish' })
  @ApiResponse({ status: 200, type: Customer })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @ApiOperation({ summary: 'Customer patch qilish' })
  @ApiResponse({ status: 201, type: Customer })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @ApiOperation({ summary: 'Customer delete qilish' })
  @ApiResponse({ status: 201, type: Customer })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.delete(+id);
  }
}
