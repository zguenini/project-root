// src/products/dto/create-product.dto.ts

import {
  IsString,
  IsOptional,
  IsNumber,
  IsUrl,
  IsEnum,
  IsBoolean,
  Min,
} from 'class-validator';
import { ProductSource } from '../enums/product-source.enum';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  aliexpressId?: string;

  @IsEnum(ProductSource, { message: 'source must be a valid ProductSource' })
  source!: ProductSource;

  @IsBoolean()
  isActive!: boolean;
}
