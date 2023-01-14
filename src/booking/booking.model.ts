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
import { PaymentMethod } from '../payment_method/payment_method.model';
import { DeliveryMethod } from '../delivery_method/delivery_method.model';
import { Discount } from '../discount/discount_model';
import { Status } from '../status/status.model';

@Table({ tableName: 'booking' })
export class Booking extends Model<Booking> {
  @ApiProperty({ example: '1', description: 'Unikal id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  cart_id: number;

  @BelongsTo(() => Cart)
  cart: Cart;

  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
  })
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod)
  paymentmethod: PaymentMethod;

  @ForeignKey(() => DeliveryMethod)
  @Column({
    type: DataType.INTEGER,
  })
  delivery_method_id: number;

  @BelongsTo(() => DeliveryMethod)
  deliverymethod: DeliveryMethod;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
  })
  discount_id: number;

  @BelongsTo(() => Discount)
  discount: Discount;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  stastus_id: number;

  @BelongsTo(() => Status)
  status: Status;
}
