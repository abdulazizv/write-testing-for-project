import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerCardDto {
  @ApiProperty({ example: '1', description: 'id of customer' })
  @IsOptional()
  @IsNumber({}, { message: 'customer_id number bolishi zarur' })
  readonly customer_id: number;
  @ApiProperty({ example: 'uzcard', description: 'name of customer_card' })
  @IsOptional()
  @IsString({ message: "name string bo'lishi kerak" })
  readonly name: string;
  @ApiProperty({ example: '998907768899', description: 'phone of customer' })
  @IsOptional()
  @IsString({ message: "phone string bo'lishi kerak" })
  readonly phone: string;
  @ApiProperty({ example: '5624309091293101', description: 'number of card' })
  @IsOptional()
  @IsString({ message: "number row string bo'lishi kerak" })
  readonly number: string;
  @ApiProperty({ example: '2024', description: 'year of card' })
  @IsOptional()
  @IsString({ message: "Year string bo'lishi kerak" })
  readonly year: string;
  @ApiProperty({ example: '12', description: 'month of card' })
  @IsOptional()
  @IsString({ message: "Month string bo'lishi kerak" })
  readonly month: string;
}
