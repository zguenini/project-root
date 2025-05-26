import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- ajoute cette ligne
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { User } from './user.entity'; // <-- ajoute ceci

@Module({
  imports: [TypeOrmModule.forFeature([User])], // <-- ajoute cette ligne !
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
