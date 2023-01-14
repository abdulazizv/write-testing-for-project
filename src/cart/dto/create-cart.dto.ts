import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '1', description: 'id of ticket' })
  @IsOptional()
  @IsNumber({}, { message: 'ticket_id si number bolishi kerak' })
  readonly ticket_id: number;
  @ApiProperty({ example: '1', description: 'id of customer' })
  @IsOptional()
  @IsNumber({}, { message: 'customer_id si number bolishi kerak' })
  readonly customer_id: number;
  @ApiProperty({ example: '1', description: 'id of status' })
  @IsOptional()
  @IsNumber({}, { message: 'status_id si number bolishi kerak' })
  readonly status_id: number;
}
