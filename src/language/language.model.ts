import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import {ApiProperty} from '@nestjs/swagger'

interface LanguagecreationAttrs {
    language:string
}

@Table({tableName:'languages'})
export class Language extends Model<Language,LanguagecreationAttrs>{

    @ApiProperty({example:'1',description:'Unique Id'})
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:'English',description:'Language name'})
    @Column({
        type:DataType.STRING,
        unique:true
    })
    language:string;

    @ApiProperty({example:'description',description:'description'})
    @Column({
        type:DataType.STRING,
    })
    description:string;

    
}
