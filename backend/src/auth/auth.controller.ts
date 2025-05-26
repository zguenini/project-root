import { Controller, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.authService.register(registerDto.email, registerDto.password);
      return { message: 'Utilisateur créé avec succès', user };
    } catch (error: any) {
      if (error.status === 409) {
        throw new HttpException('Email déjà utilisé', HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new HttpException('Identifiants invalides', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.login(user);
  }
}
