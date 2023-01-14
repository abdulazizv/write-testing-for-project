import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDeliveryMethodDto {
    @ApiProperty({example:'Online',description:'name of deliveryMethod'})
    @IsString({message:"name string bolishi kerak"})
    readonly name:string;
}
