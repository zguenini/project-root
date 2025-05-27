import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // charge automatiquement .env

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

        if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
          throw new Error('❌ One or more required DB env variables are missing.');
        }

        return {
          type: 'postgres',
          host: DB_HOST,
          port: parseInt(DB_PORT, 10),
          username: DB_USER,
          password: DB_PASS,
          database: DB_NAME,
          entities: [User, Product, Order, OrderItem],
          synchronize: true,
        };
      },
    }),

    TypeOrmModule.forFeature([User, Product, Order, OrderItem]),
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
