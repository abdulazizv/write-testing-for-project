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
import { Venue } from '../venue/venue.model';
import { SeatType } from '../seat_type/seat_type.model';
import { Ticket } from '../ticket/ticket.model';
import { Sector } from '../sector/sector.model';

@Table({ tableName: 'seat' })
export class Seat extends Model<Seat> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Sector)
  @Column({
    type: DataType.INTEGER,
  })
  sector: number;

  @ApiProperty({ example: '2', description: 'Rows_number' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  row_number: number;

  @ApiProperty({ example: '100', description: 'number of seat' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
  })
  venue_id: number;

  @BelongsTo(() => Venue)
  venue: Venue;

  @ForeignKey(() => SeatType)
  @Column({
    type: DataType.INTEGER,
  })
  seat_type_id: number;

  @BelongsTo(() => SeatType)
  seatType: SeatType;

  @ApiProperty({
    example: 'line:100 location:12',
    description: 'location of seat',
  })
  @Column({
    type: DataType.STRING,
  })
  location_in_schema: string;

  @HasMany(() => Ticket)
  ticket: Ticket;
}
