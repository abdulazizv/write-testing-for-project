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

@Table({ tableName: 'payment-method' })
export class PaymentMethod extends Model<PaymentMethod> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Naqd', description: 'payment method' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasOne(() => Booking)
  booking: Booking;
}
