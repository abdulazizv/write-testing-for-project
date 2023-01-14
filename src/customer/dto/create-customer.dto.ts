import { ApiProperty } from '@nestjs/swagger';
import { IsString,IsOptional,IsNumber} from 'class-validator'
export class CreateCustomerDto {
    @ApiProperty({example:'firstname1',description:'first_name of customer'})
    @IsString({message:'first_name string bolishi kerak'})
    readonly first_name:string;
    @ApiProperty({example:'lastname1',description:'last_name of customer'})
    @IsString({message:'last_name string bolishi kerak'})
    readonly last_name:string;
    @ApiProperty({example:'998901290139',description:'phone of customer'})
    @IsOptional()
    @IsString({message:'phone string bolishi kerak'})
    readonly phone:string;
    @ApiProperty({example:'password1',description:'password of customer'})
    @IsOptional()
    @IsString({message:'hashed_password string bolishi kerak'})
    readonly hashed_password:string;
    @ApiProperty({example:'email',description:'email of customer'})
    @IsOptional()
    @IsString({message:'email string bolishi kerak'})
    readonly email:string;
    @ApiProperty({example:'2022-12-03',description:'date of customer'})
    readonly birth_date:Date;
    @IsOptional()
    @IsNumber({},{message:'Gender number bolishi kerak'})
    @ApiProperty({example:'Male',description:'male of customer'})
    readonly gender:number;
    @ApiProperty({example:'1',description:'language_id of customer'})
    @IsOptional()
    @IsNumber({},{message:'lang_id number bolishi kerak'})
    readonly lang_id:number;
    
}
