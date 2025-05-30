import { IsString, IsOptional, IsEnum, IsDecimal, IsUrl } from 'class-validator';
import { SupplierType } from '../enums/supplier-type.enum';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsEnum(SupplierType)
  @IsOptional()
  supplier?: SupplierType;

  @IsString()
  @IsOptional()
  aliexpressId?: string;

  @IsString()
  @IsOptional()
  amazonAsin?: string;
}
