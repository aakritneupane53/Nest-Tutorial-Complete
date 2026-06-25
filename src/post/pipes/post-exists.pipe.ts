import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from '../post.service';

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postService: PostService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const exists = this.postService.posts.find((post) => post.id === value);
      if (!exists)
        throw new NotFoundException(
          `Could not find the post with the give id:${value}`,
        );
      return value;
    } catch (error) {
      throw new NotFoundException(
        `Could not find the post with the give id:${value}`,
      );
    }
  }
}
