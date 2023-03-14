import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional } from "class-validator";

export class CreateDiscountDto {
  @ApiProperty({ example: '50', description: 'how much discount ?' })
  @IsNumber({}, { message: 'discount_id number bolishi kerak' })
  readonly discount: number;
  @ApiProperty({
    example: '2022-12-09',
    description: 'how long day this discount is available ? ',
  })
  @IsOptional()
  @IsDate()
  readonly finish_date: Date;
}
