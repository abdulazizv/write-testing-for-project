import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Seat } from '../seat/seat.model';

@Table({ tableName: 'sector' })
export class Sector extends Model<Sector> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'name of sector' })
  @Column({
    type: DataType.STRING,
  })
  sector_name: string;

  @HasMany(() => Seat)
  seat: Seat;
}
