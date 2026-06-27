import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class UserDto {
  @IsEmail({}, { message: 'Must be an email' })
  email: string;

  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be atleast 3 characters long' })
  @MaxLength(25, { message: 'Name must can be atmost 25 characters long' })
  name: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be atleast 3 characters long' })
  @MaxLength(25, { message: 'Password must can be atmost 25 characters long' })
  password: string;
}
