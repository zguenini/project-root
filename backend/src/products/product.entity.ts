// src/products/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { ProductSource } from './enums/product-source.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Index()
  @Column({ nullable: true, unique: true })
  aliexpressId?: string;

  @Index()
  @Column({ nullable: true, unique: true })
  amazonId?: string;

  @Index()
  @Column({ nullable: true, unique: true })
  shopifyId?: string;

  @Column({ type: 'enum', enum: ProductSource, default: ProductSource.MANUAL })
  @IsEnum(ProductSource)
  source!: ProductSource;

  @Column({ default: true })
  isActive!: boolean;

  @Exclude()
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
