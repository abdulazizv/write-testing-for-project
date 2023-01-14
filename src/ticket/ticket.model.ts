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
import { Event } from '../event/event.model';
import { Seat } from '../seat/seat.model';
import { TicketType } from '../ticket_type/ticket_type.model';
import { Cart } from '../cart/cart.model';
import { Status } from '../status/status.model';

@Table({ tableName: 'ticket' })
export class Ticket extends Model<Ticket> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
  })
  event_id: number;

  @BelongsTo(() => Event)
  event: Event;

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.INTEGER,
  })
  seat_id: number;

  @ApiProperty({ example: '12.000', description: 'price of ticket' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: '12.000', description: 'price of ticket' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  service_fee: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @ForeignKey(() => TicketType)
  @Column({
    type: DataType.INTEGER,
  })
  ticket_type: number;

  @BelongsTo(() => TicketType)
  tickettype: TicketType;

  @BelongsTo(() => Seat)
  seat: Seat;

  @HasMany(() => TicketType)
  ticketType: TicketType;

  @HasMany(() => Cart)
  cart: Cart;
}
