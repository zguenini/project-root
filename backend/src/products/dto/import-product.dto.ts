import { IsEnum, IsString } from 'class-validator';
import { ProductSource } from '../enums/product-source.enum';

export class ImportProductDto {
  @IsEnum(ProductSource)
  supplier!: ProductSource;

  @IsString()
  url!: string;
}
