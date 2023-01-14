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

@Table({ tableName: 'delivery-method' })
export class DeliveryMethod extends Model<DeliveryMethod> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'moto', description: 'delivery method' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasOne(() => Booking)
  booking: Booking;
}
