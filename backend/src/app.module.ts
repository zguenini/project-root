import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
        const host = config.get<string>('DB_HOST') ?? 'localhost';
        const port = parseInt(config.get<string>('DB_PORT') ?? '5432', 10);
        const username = config.get<string>('DB_USER') ?? 'myuser';
        const password = config.get<string>('DB_PASS') ?? 'mypass';
        const database = config.get<string>('DB_NAME') ?? 'myappdb';

        const dbConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [User, Product, Order, OrderItem],
          synchronize: true,
        };

        console.log('\n========== DB CONFIG ==========');
        console.log(dbConfig);
        console.log('================================\n');

        return dbConfig;
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
