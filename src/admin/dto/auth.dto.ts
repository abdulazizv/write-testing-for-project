import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({example:'name1',description:'name of admin'})
    @IsString()
    readonly name:string;
    @ApiProperty({example:'email1',description:'email of admin'})
    @IsOptional()
    @IsString()
    readonly email:string;
    @ApiProperty({example:'password1',description:'password of admin'})
    @IsString()
    readonly password:string;
}