import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module'; // <-- À ajouter
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Order } from './orders/order.entity';         // <-- À ajouter
import { OrderItem } from './orders/order-item.entity'; // <-- À ajouter

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'dropshipping',
      entities: [User, Product, Order, OrderItem], // <-- Ajoute ici
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule, // <-- Ajoute ici
  ],
})
export class AppModule {}
