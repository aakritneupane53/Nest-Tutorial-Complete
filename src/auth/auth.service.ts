import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import argon2 from 'argon2';
import { User } from 'src/user/enitiy/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant/jwt-seceret.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //utilities
  private async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }

  private async generateAccessToken(user: User): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      { secret: jwtConstants.accessSecret, expiresIn: '15m' },
    );
    return accessToken;
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { secret: jwtConstants.refreshSecret, expiresIn: '7d' },
    );
    return refreshToken;
  }

  private async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  private async matchPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }
  async createAdmin(registerUserDto: RegisterUserDto) {
    return this.userService.createAdmin(registerUserDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user)
      throw new NotFoundException(
        'User with the email not found, please consider registering first',
      );
    // verify the password
    const matchedPassword = await this.matchPassword(
      loginDto.password,
      user.password,
    );
    if (!matchedPassword)
      throw new BadRequestException('Please do enter the correct password');

    const { accessToken, refreshToken } = await this.generateTokens(user);
    const { password, ...userData } = user;
    return { accessToken, refreshToken, userData };
  }
}
