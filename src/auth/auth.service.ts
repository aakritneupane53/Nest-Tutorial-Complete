import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(registerUserDto: RegisterUserDto) {
    return this.userService.createUser(registerUserDto);
  }
}
