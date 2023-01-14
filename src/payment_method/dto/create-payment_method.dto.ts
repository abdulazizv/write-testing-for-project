import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePaymentMethodDto {
    @ApiProperty({example:'name1',description:'name of payment_method'})
    @IsString({message:'name string bolishi zarur'})
    readonly name:string;
}
