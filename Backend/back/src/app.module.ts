import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Car } from './car/entities/car.entity';
import { AuthModule } from './auth/auth.module';
import { CarModule } from './car/car.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';

import { RatingModule } from './rating/rating.module';
import { MessageModule } from './message/message.module';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'student',
      password: 'student',
      database: 'khalil',
      entities: [User, Car, Reservation],
      synchronize: true,
    }),
    AuthModule,
    CarModule,
    ReservationModule,
    RatingModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
