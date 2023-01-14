import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '../booking/booking.model';

@Table({ tableName: 'discount' })
export class Discount extends Model<Discount> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '45', description: 'discount miqdori' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  discount: number;

  @ApiProperty({ example: '16.12.2022', description: 'discount kun chegarasi' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  finish_date: Date;

  @HasOne(() => Booking)
  booking: Booking;
}
