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

@Table({ tableName: 'ticket-type' })
export class TicketType extends Model<TicketType> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'sariq', description: 'color of ticket' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @ApiProperty({ example: 'elektron', description: 'name of ticket' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER,
  })
  ticket_id: number;

  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @HasOne(() => Ticket)
  ticket_status: Ticket;
}
