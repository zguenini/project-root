import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // <-- Ajoute cette ligne
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Choisis bien ta clé !
      signOptions: { expiresIn: '1d' }, // Optionnel, adapte si besoin
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
