import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCartDto } from './create-cart.dto';
import { IsNumber, IsOptional } from "class-validator";

export class UpdateCartDto extends PartialType(CreateCartDto) {
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
