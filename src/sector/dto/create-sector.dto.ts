import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSectorDto {
    @ApiProperty({example:'name1',description:'name of sector'})
    @IsString()
    readonly sector_name:string;
}
