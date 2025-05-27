import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    // On charge aussi user, items et les produits pour chaque item
    return this.orderRepository.find({ relations: ['items', 'user', 'items.product'] });
  }

  findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'user', 'items.product'],
    });
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }
    // Retourne les commandes d’un user précis
  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'user', 'items.product'],
    });
  }

  // Pour update
  async update(id: number, data: Partial<Order>): Promise<Order | null> {
    await this.orderRepository.update(id, data);
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'user', 'items.product'],
    });
  }

  // Pour delete
  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

}
