import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateAdminDto {
  @ApiProperty({ example: 'name1', description: 'name of admin' })
  @IsString({ message: 'name string bolishi kerak' })
  readonly name: string;
  @ApiProperty({ example: 'login1', description: 'login of email' })
  @IsString({ message: 'login string bolishi kerak' })
  readonly login: string;
  @ApiProperty({ example: 'password1', description: 'password of admin' })
  @IsOptional()
  @IsString()
  readonly hashed_password: string;
}
