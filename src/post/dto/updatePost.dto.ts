import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty({ message: 'Ttitle is required' })
  @IsString({ message: 'Title must be string' })
  @MinLength(3, { message: 'Title must be atleast 3 characters long' })
  @MaxLength(20, { message: 'Title must be at max 20 characters long' })
  @IsOptional()
  title?: string;

  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be string' })
  @MinLength(3, { message: 'Content must be atleast 3 characters long' })
  @MaxLength(20, { message: 'Content must be at max 20 characters long' })
  @IsOptional()
  content?: string;

  @IsNotEmpty({ message: 'Author name is required' })
  @IsString({ message: 'Author name must be string' })
  @MinLength(3, { message: 'Author name must be atleast 3 characters long' })
  @MaxLength(20, { message: 'Author name must be at max 20 characters long' })
  @IsOptional()
  authorName?: string;
}
