import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LanguageModule } from './language/language.module';
import { EventTypeModule } from './event_type/event_type.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { VenueTypeModule } from './venue_type/venue_type.module';
import { VenueModule } from './venue/venue.module';
import { EventModule } from './event/event.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { Language } from './language/language.model';
import { EventType } from './event_type/event_type.model';
import { HumanCategory } from './human_category/human_category.model';
import { VenueType } from './venue_type/venue_type.model';
import { Venue } from './venue/venue.model';
import { Event } from './event/event.model';
import { Region } from './region/region.model';
import { District } from './district/district.model';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { SeatModule } from './seat/seat.module';
import { TicketTypeModule } from './ticket_type/ticket_type.module';
import { TicketModule } from './ticket/ticket.module';
import { Seat } from './seat/seat.model';
import { Ticket } from './ticket/ticket.model';
import { SeatType } from './seat_type/seat_type.model';
import { TicketType } from './ticket_type/ticket_type.model';
import { CustomerModule } from './customer/customer.module';
import { CustomerAdressModule } from './customer_adress/customer_adress.module';
import { GenderModule } from './gender/gender.module';
import { CountryModule } from './country/country.module';
import { FlatModule } from './flat/flat.module';
import { Country } from './country/country.model';
import { Customer } from './customer/customer.model';
import { CustomerAdress } from './customer_adress/customer_adress.model';
import { Flat } from './flat/flat.model';
import { Gender } from './gender/gender.model';
import { AdminModule } from './admin/admin.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { CartModule } from './cart/cart.module';
import { BookingModule } from './booking/booking.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { StatusModule } from './status/status.module';
import { DiscountModule } from './discount/discount.module';
import { Status } from './status/status.model';
import { Discount } from './discount/discount_model';
import { DeliveryMethod } from './delivery_method/delivery_method.model';
import { PaymentMethod } from './payment_method/payment_method.model';
import { Booking } from './booking/booking.model';
import { CustomerCard } from './customer_card/customer_card.model';
import { Admin } from './admin/admin.model';
import { Cart } from './cart/cart.model';
import { APP_GUARD } from '@nestjs/core';
import { SectorModule } from './sector/sector.module';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './files/files.module';
import { Sector } from './sector/sector.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Language,
        EventType,
        HumanCategory,
        VenueType,
        Venue,
        Event,
        Region,
        District,
        Seat,
        Ticket,
        SeatType,
        TicketType,
        Country,
        Customer,
        CustomerAdress,
        Flat,
        Gender,
        Discount,
        DeliveryMethod,
        PaymentMethod,
        Booking,
        CustomerCard,
        Admin,
        Cart,
        Status,
        Sector,
      ],
      autoLoadModels: true,
      logging: false,
    }),

    LanguageModule,
    EventTypeModule,
    HumanCategoryModule,
    VenueTypeModule,
    VenueModule,
    EventModule,
    RegionModule,
    DistrictModule,
    SeatTypeModule,
    SeatModule,
    TicketModule,
    TicketTypeModule,
    CustomerModule,
    CustomerAdressModule,
    GenderModule,
    CountryModule,
    FlatModule,
    AdminModule,
    CustomerCardModule,
    CartModule,
    BookingModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    StatusModule,
    DiscountModule,
    SectorModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
