import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerAdressDto } from './create-customer_adress.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerAdressDto extends PartialType(
  CreateCustomerAdressDto,
) {
  @ApiProperty({ example: '1', description: 'id of customer_adress' })
  @IsNumber({}, { message: 'customer_id number bolishi kerak' })
  readonly customer_id: number;
  @ApiProperty({ example: 'name1', description: 'name of customer_adress' })
  @IsString({ message: 'name string bolishi kerak' })
  readonly name: string;
  @ApiProperty({ example: '1', description: 'id of country' })
  @IsNumber({}, { message: 'country_id number bolishi kerak' })
  readonly country_id: number;
  @ApiProperty({ example: '1', description: 'id of region' })
  @IsNumber({}, { message: 'region_id number bolishi kerak' })
  readonly region_id: number;
  @ApiProperty({ example: '1', description: 'id of district' })
  @IsOptional()
  @IsNumber({}, { message: 'district_id number bolishi kerak' })
  readonly district_id: number;
  @ApiProperty({ example: '1', description: 'id of street' })
  @IsString({ message: 'Street type string bolishi kerak' })
  readonly street: string;
  @ApiProperty({ example: 'Uy', description: 'house of customer_adress' })
  @IsString({ message: 'House string bolishi kerak' })
  readonly house: string;
  @ApiProperty({ example: '1', description: 'id of flat' })
  @IsOptional()
  @IsNumber({}, { message: 'Flat number bolishi kerak' })
  readonly flat: number;
  @ApiProperty({ example: 'location', description: 'location of customer' })
  @IsString({ message: 'location string bolishi kerak' })
  readonly location: string;
  @ApiProperty({ example: '1', description: 'post_index of customer_adress' })
  @IsNumber({}, { message: 'post_index number bolishi kerak' })
  readonly post_index: number;
  @ApiProperty({ example: '1', description: 'info of customer_adress' })
  @IsString({ message: 'info string bolishi kerak' })
  readonly info: string;
}
