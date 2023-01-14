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
import { Cart } from '../cart/cart.model';
import { Booking } from '../booking/booking.model';
import { Ticket } from '../ticket/ticket.model';

@Table({ tableName: 'status' })
export class Status extends Model<Status> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'status', description: 'status method' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @HasMany(() => Cart)
  cart: Cart;

  @HasMany(() => Booking)
  Booking: Cart;

  @HasMany(() => Ticket)
  ticket: Cart;
}
