import { Module } from '@nestjs/common'; //

import { OrdersService } from './orders.service'; //
import { TypeOrmModule } from '@nestjs/typeorm'; //
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrdersController } from './orders.controller'; //

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, TypeOrmModule] // 👈 export explicite
})
export class OrdersModule {}
