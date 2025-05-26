// src/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    await this.productRepository.update(id, data);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  // --------- Import d'un produit AliExpress ---------
  async importFromAliExpress(url: string): Promise<Product> {
    const match = url.match(/item\/(\d+)\.html/);
    const fakeAliId = match ? match[1] : Date.now().toString();

    const importedProduct: Partial<Product> = {
      name: `Produit AliExpress #${fakeAliId}`,
      description: 'Importé depuis AliExpress (exemple)',
      price: Math.round(Math.random() * 10000) / 100,
      imageUrl: 'https://ae01.alicdn.com/kf/Scouverture.png',
      aliexpressId: fakeAliId,
    };
    return this.create(importedProduct);
  }

  // --------- Synchronise UN produit via son id AliExpress ---------
  async syncAliExpressProduct(productId: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product || !product.aliexpressId) return product;

    // --- Simulation : génère un nouveau prix random
    const updatedPrice = Math.round(Math.random() * 10000) / 100;

    product.price = updatedPrice;
    // Tu pourrais mettre à jour d'autres champs ici (stock, image, etc.)
    return this.productRepository.save(product);
  }

  // --------- Synchronise TOUS les produits AliExpress ---------
  async syncAllAliExpressProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({ where: { aliexpressId: Not(IsNull()) } });
    const results: Product[] = [];
    for (const prod of products) {
      const updated = await this.syncAliExpressProduct(prod.id);
      if (updated) results.push(updated);
    }
    return results;
  }
}
