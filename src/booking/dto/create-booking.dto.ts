import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateBookingDto {
  @ApiProperty({ example: '1', description: 'id of cart' })
  @IsOptional()
  @IsNumber({}, { message: 'Cart_id number bolishi kerak' })
  readonly cart_id: number;
  @ApiProperty({ example: '1', description: 'id of payment' })
  @IsOptional()
  @IsNumber({}, { message: 'Payment_method_id number bolishi kerak' })
  readonly payment_method_id: number;
  @ApiProperty({ example: '1', description: 'id of delivery' })
  @IsOptional()
  @IsNumber({}, { message: 'delivery_method_id number bolishi kerak' })
  readonly delivery_method_id: number;
  @ApiProperty({ example: '1', description: 'id of discount' })
  @IsOptional()
  @IsNumber({}, { message: 'discount_id number bolishi kerak' })
  readonly discount_id: number;
  @ApiProperty({ example: '1', description: 'id of status' })
  @IsOptional()
  @IsNumber({}, { message: 'stastus_id number bolishi kerak' })
  readonly stastus_id: number;
}
