import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import {ApiProperty} from '@nestjs/swagger'


@Table({tableName:'seat_type'})

export class SeatType extends Model<SeatType>{

    @ApiProperty({example:'1',description:'unique Id'})
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:'Vip',description:'Orindiq type'})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    name:string;

}