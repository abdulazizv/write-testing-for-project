import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStatusDto {
    @ApiProperty({example:'good',description:'name of status'})
    @IsString({message:"Status string bo'lishi kerak"})
    readonly status:string;
}
