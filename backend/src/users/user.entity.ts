import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id!: number;

  @Column({ unique: true })
  @Expose()
  email!: string;

  @Column()
  @Exclude()
  password!: string;
}
