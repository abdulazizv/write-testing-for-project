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
import { Ticket } from '../ticket/ticket.model';
import { Customer } from '../customer/customer.model';
import { Status } from '../status/status.model';
import { Booking } from '../booking/booking.model';

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER,
  })
  ticket_id: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;
  @BelongsTo(() => Status)
  status: Status;

  @HasOne(() => Booking)
  booking: Booking;
}
