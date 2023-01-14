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
import { EventType } from '../event_type/event_type.model';
import { HumanCategory } from '../human_category/human_category.model';
import { Venue } from '../venue/venue.model';
import { Language } from '../language/language.model';
import { Ticket } from '../ticket/ticket.model';

interface eventcreationAttrs {
  name: string;
  info: string;
  photo?: string;
}

@Table({ tableName: 'events' })
export class Event extends Model<Event, eventcreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'image.jpg', description: 'photo of event' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @ApiProperty({ example: 'image.jpg', description: 'photo of event' })
  @Column({
    type: DataType.STRING,
    defaultValue: 'image.jpg',
  })
  photo: string;

  @ApiProperty({ example: '12.01.2021', description: 'date of event' })
  @Column({
    type: DataType.DATE,
  })
  start_date: Date;

  @ApiProperty({ example: '12:00', description: 'start_time of event' })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({ example: '12.01.2021', description: 'end_date of event' })
  @Column({
    type: DataType.DATE,
  })
  finish_date: Date;

  @ApiProperty({ example: '14:00', description: 'finish_time of event' })
  @Column({
    type: DataType.STRING,
  })
  finish_time: string;

  @ApiProperty({
    example: 'bugungi futbol ajoyib kuni',
    description: 'info of event',
  })
  @Column({
    type: DataType.TEXT,
  })
  info: string;

  @ForeignKey(() => EventType)
  @Column({
    type: DataType.INTEGER,
  })
  event_type_id: number;

  @ForeignKey(() => HumanCategory)
  @Column({
    type: DataType.INTEGER,
  })
  human_category_id: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
  })
  venue_id: number;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  lang_id: number;

  @ApiProperty({ example: '12.12.2022', description: 'Release data of event' })
  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  release_date: Date;

  @HasMany(() => Ticket)
  ticket: Ticket;
}
