import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import {ApiProperty} from '@nestjs/swagger'
import { Customer } from "../customer/customer.model";
import { Country } from "../country/country.model";
import { Region } from "../region/region.model";
import { District } from "../district/district.model";
import { Flat } from "../flat/flat.model";

@Table({tableName:'customer-address'})

export class CustomerAdress extends Model<CustomerAdress> {

    @ApiProperty({example:'1',description:'Unique ID'})
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ForeignKey(()=> Customer)
    @Column({
        type:DataType.INTEGER
    })
    customer_id:number;

    @ApiProperty({example:'name',description:'Name of customer address'})
    @Column({
        type:DataType.STRING
    })
    name:string;

    @ForeignKey(()=> Country)
    @Column({
        type:DataType.INTEGER
    })
    country_id:number;

    @ForeignKey(()=> Region)
    @Column({
        type:DataType.INTEGER
    })
    region_id:number;

    @ForeignKey(()=> District)
    @Column({
        type:DataType.INTEGER
    })
    district_id:number;

    @ApiProperty({example:'Abdulla nabiev 8',description:'street of address'})
    @Column({
        type:DataType.STRING
    })
    street:string;

    @ApiProperty({example:'Abdulla nabiev 8',description:'house of address'})
    @Column({
        type:DataType.STRING
    })
    house:string;

    @ForeignKey(()=> Flat)
    @Column({
        type:DataType.INTEGER
    })
    flat:number;

    @ApiProperty({example:'location',description:'location of address'})
    @Column({
        type:DataType.STRING
    })
    location:string;

    @ApiProperty({example:'post_index',description:'post_index of address'})
    @Column({
        type:DataType.STRING
    })
    post_index:number; 

    @ApiProperty({example:'customerinfo',description:'info of address'})
    @Column({
        type:DataType.TEXT
    })
    info:string;
}