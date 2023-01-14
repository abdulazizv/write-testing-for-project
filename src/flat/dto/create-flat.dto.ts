import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFlatDto {
    @ApiProperty({example:'9',description:'how much line of flat'})
    @IsOptional()
    @IsNumber({},{message:'Etaj number bolishi kerak'})
    readonly etaj:number;
    @ApiProperty({example:'good',description:'condition of flat'})
    @IsOptional()
    @IsString({message:'condition string bolishi zarur'})
    readonly condition:string;

}
