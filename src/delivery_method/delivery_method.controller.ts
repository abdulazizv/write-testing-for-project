import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeliveryMethod } from './delivery_method.model';
import { DeliveryMethodService } from './delivery_method.service';
import { CreateDeliveryMethodDto } from './dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery_method.dto';

@Controller('delivery-method')
export class DeliveryMethodController {
  constructor(private readonly deliveryMethodService: DeliveryMethodService) {}

  @ApiOperation({summary:"DeliveryMethod post qilish"})
  @ApiResponse({status:201,type:DeliveryMethod})
  @Post()
  create(@Body() createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return this.deliveryMethodService.create(createDeliveryMethodDto);
  }

  @ApiOperation({summary:"DeliveryMethodlarni get qilish"})
  @ApiResponse({status:200,type:[DeliveryMethod]})
  @Get()
  findAll() {
    return this.deliveryMethodService.findAll();
  }

  @ApiOperation({summary:"DeliveryMethodni get qilish"})
  @ApiResponse({status:200,type:DeliveryMethod})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryMethodService.findOne(+id);
  }

  
  @ApiOperation({summary:"DeliveryMethodlarni patch qilish"})
  @ApiResponse({status:202,type:DeliveryMethod})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryMethodDto: UpdateDeliveryMethodDto) {
    return this.deliveryMethodService.update(+id, updateDeliveryMethodDto);
  }

  @ApiOperation({summary:"DeliveryMethodlarni delete qilish"})
  @ApiResponse({status:203,type:DeliveryMethod})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryMethodService.remove(+id);
  }
}
