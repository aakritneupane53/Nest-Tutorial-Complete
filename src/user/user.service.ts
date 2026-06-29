import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './enitiy/user.entity';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async createUser(registerDto: RegisterUserDto) {
    const existingUser = await this.findUserByEmail(registerDto.email);
    if (existingUser)
      throw new ConflictException('The user with this email already exists');
    const hashedPassword = await this.hashPassword(registerDto.password);
    if (!hashedPassword)
      throw new InternalServerErrorException('Hashing failed');

    const newUser = await this.userRepository.save({
      ...registerDto,
      password: hashedPassword,
    });

    if (!newUser)
      throw new InternalServerErrorException(
        'Failed to write new user to the db',
      );
    return newUser;
  }
}
