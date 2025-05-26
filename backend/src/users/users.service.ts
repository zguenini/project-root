import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Trouver un utilisateur par email
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user || null;
  }

  // Créer un nouvel utilisateur
  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  // Lister tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Trouver par id
  async findById(id: number): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user || null;
  }

  // Mettre à jour un utilisateur
  async update(id: number, data: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, data);
    return this.usersRepository.findOne({ where: { id } });
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
