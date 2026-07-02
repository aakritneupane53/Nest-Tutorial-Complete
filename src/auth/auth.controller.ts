import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    return await this.authService.register(registerDto);
  }
  @Post('create-admin')
  async createAdmin(@Body() registerDto: RegisterUserDto) {
    return await this.authService.createAdmin(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { accessToken, refreshToken, userData } =
      await this.authService.login(loginDto);
    return { accessToken, refreshToken, userData };
  }
}
