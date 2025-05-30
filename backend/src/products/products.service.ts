import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ImportProductDto } from './dto/import-product.dto';
import { ProductSource } from './enums/product-source.enum';
import * as csvParser from 'csv-parse/sync';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async paginate(page = 1, limit = 20): Promise<{ data: Product[]; total: number }> {
    const [data, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Produit non trouvé');
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.repo.create(dto);
    return this.repo.save(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.repo.remove(product);
  }

  async importFromSupplier(dto: ImportProductDto): Promise<Product> {
    switch (dto.supplier) {
      case ProductSource.ALIEXPRESS:
        return this.importFromAliExpress(dto.url);
      case ProductSource.AMAZON:
        return this.importFromAmazon(dto.url);
      case ProductSource.SHOPIFY:
        return this.importFromShopify(dto.url);
      case ProductSource.CSV:
        return this.importFromCsv(dto.url);
      default:
        throw new NotFoundException('Fournisseur non supporté');
    }
  }

  async importFromAliExpress(url: string): Promise<Product> {
    const id = url.match(/item\/(\d+)\.html/)?.[1] ?? Date.now().toString();
    const product = this.repo.create({
      name: `AliExpress #${id}`,
      description: 'Importé depuis AliExpress',
      imageUrl: 'https://ae01.alicdn.com/kf/demo.png',
      aliexpressId: id,
      price: this.randomPrice(),
      source: ProductSource.ALIEXPRESS,
    });
    return this.repo.save(product);
  }

  async importFromAmazon(url: string): Promise<Product> {
    const asin = url.match(/\/dp\/(\w{10})/)?.[1] ?? Date.now().toString();
    const product = this.repo.create({
      name: `Amazon #${asin}`,
      description: 'Importé depuis Amazon',
      imageUrl: 'https://amazon.fr/image/demo.png',
      price: this.randomPrice(),
      source: ProductSource.AMAZON,
      metadata: { asin },
    });
    return this.repo.save(product);
  }

  async importFromShopify(url: string): Promise<Product> {
    const id = url.match(/products\/(\w+)/)?.[1] ?? Date.now().toString();
    const product = this.repo.create({
      name: `Shopify #${id}`,
      description: 'Importé depuis Shopify',
      imageUrl: 'https://cdn.shopify.com/s/files/demo.png',
      price: this.randomPrice(),
      source: ProductSource.SHOPIFY,
      metadata: { shopifyId: id },
    });
    return this.repo.save(product);
  }

  async importFromCsv(raw: string): Promise<Product> {
    const rows = csvParser.parse(raw, { columns: true });
    const first = rows[0];
    const product = this.repo.create({
      name: first.name,
      description: first.description,
      price: parseFloat(first.price),
      imageUrl: first.imageUrl,
      source: ProductSource.CSV,
      metadata: { row: first },
    });
    return this.repo.save(product);
  }

  async syncOne(id: number): Promise<Product> {
    const product = await this.findOne(id);
    product.price = this.randomPrice();
    return this.repo.save(product);
  }

  async syncAll(): Promise<Product[]> {
    const products = await this.repo.find({ where: { source: ProductSource.ALIEXPRESS } });
    const updated: Product[] = [];
    for (const p of products) {
      p.price = this.randomPrice();
      updated.push(await this.repo.save(p));
    }
    return updated;
  }

  private randomPrice(): number {
    return Math.round(Math.random() * 10000) / 100;
  }
}
