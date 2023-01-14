import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateGenderDto {
    @ApiProperty({example:'male',description:'gender of people'})
    @IsOptional()
    @IsString({message:'male string bolishi kerak'})
    readonly male:string;
    @ApiProperty({example:'female',description:'gender of people'})
    @IsOptional()
    @IsString({message:'female string bolishi kerak'})
    readonly female:string;
}
