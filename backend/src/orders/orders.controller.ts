import {
  Controller, Get, Post, Put, Delete, Param, Body,
  UseGuards, UsePipes, ValidationPipe, Request, ForbiddenException
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

// Type pour l'utilisateur dans le JWT (à adapter si besoin)
interface JwtUserPayload {
  id: number;
  email: string;
}

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Voir SES propres commandes
  @Get()
  async findAll(@Request() req: { user: JwtUserPayload }): Promise<Order[]> {
    return this.ordersService.findByUserId(req.user.id);
  }

  // Voir le détail d’une commande (si elle appartient au user)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req: { user: JwtUserPayload }
  ): Promise<Order | null> {
    const order = await this.ordersService.findOne(Number(id));
    if (!order || order.user.id !== req.user.id) throw new ForbiddenException();
    return order;
  }

  // Créer une commande
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() data: CreateOrderDto,
    @Request() req: { user: JwtUserPayload }
  ): Promise<Order> {
    return this.ordersService.create({
      user: { id: req.user.id } as any,
      items: data.items.map(item => ({
        product: { id: item.productId } as any,
        quantity: item.quantity,
        price: item.price,
      })) as any,
      status: 'pending',
    });
  }

  // Modifier une commande
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() data: UpdateOrderDto,
    @Request() req: { user: JwtUserPayload }
  ): Promise<Order | null> {
    const order = await this.ordersService.findOne(Number(id));
    if (!order || order.user.id !== req.user.id) throw new ForbiddenException();
    return this.ordersService.update(Number(id), data);
  }

  // Supprimer une commande
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req: { user: JwtUserPayload }
  ): Promise<void> {
    const order = await this.ordersService.findOne(Number(id));
    if (!order || order.user.id !== req.user.id) throw new ForbiddenException();
    return this.ordersService.remove(Number(id));
  }
}
