import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.findOne(Number(id));
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product | null> {
    return this.productsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(Number(id));
  }

  // Import/sync AliExpress (facultatif, tu peux protéger aussi)
  @Post('import-aliexpress')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  importAliExpress(@Body() body: { url: string }): Promise<Product> {
    return this.productsService.importFromAliExpress(body.url);
  }
}
