import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import {ApiProperty} from '@nestjs/swagger'

@Table({tableName:'event-type'})
export class EventType extends Model<EventType> {

    @ApiProperty({example:'1',description:'Unikal id'})
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number

    @ApiProperty({example:'sport',description:'type turi'})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    name:string;

  
    @ForeignKey(()=> EventType)
    @Column({
        type:DataType.INTEGER
    })
    parent_event_type_id:number;

    @HasMany(()=> EventType)
    eventtype:EventType[]

}

