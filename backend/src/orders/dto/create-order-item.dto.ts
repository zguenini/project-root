// src/orders/dto/create-order-item.dto.ts

import { IsInt, IsPositive, Min, IsOptional, IsUUID } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  declare productId: number;

  @IsInt()
  @Min(1)
  declare quantity: number;

  @IsOptional()
  @IsUUID()
  variantId?: string;
}
