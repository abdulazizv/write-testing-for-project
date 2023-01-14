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
import { VenueType } from '../venue_type/venue_type.model';
import { Region } from '../region/region.model';
import { District } from '../district/district.model';
import { Seat } from '../seat/seat.model';
import { GeometryDataType } from 'sequelize';

interface venuecreationAttrs {
  name: string;
  address: string;
  location: string;
}

@Table({ tableName: 'venues' })
export class Venue extends Model<Venue, venuecreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Bunyodkor stadium', description: 'Name of venue' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'Abdulla Nabiev 8', description: 'Adress of venue' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({ example: 'Location', description: 'Location of venue' })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: 'https://examplesite.com',
    description: 'Site of venue',
  })
  @Column({
    type: DataType.STRING,
  })
  site: string;

  @ApiProperty({
    example: '+998 90 123 45 90',
    description: 'Phone number of venue',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ForeignKey(() => VenueType)
  @Column({
    type: DataType.INTEGER,
  })
  venue_type_id: number;

  @BelongsTo(() => VenueType)
  venuetype: VenueType;

  @ApiProperty({ example: 'polygon', description: 'multipolygon' })
  @Column({
    type: DataType.STRING,
  })
  schema: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;

  @BelongsTo(() => District)
  user: District;

  @HasMany(() => VenueType)
  venue: VenueType;

  @HasMany(() => Seat)
  seat: Seat;
}
