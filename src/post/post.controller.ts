import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostInterface } from './interface/post.interface';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('all')
  fetchPosts(@Query('search') search: string) {
    return this.postService.fetchPosts(search);
  }
  @Get(':id')
  fetchPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.fetchPost(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() createPostData: Omit<PostInterface, 'id' | 'createdAt'>) {
    const newPost = this.postService.createNewPost(createPostData);
    return newPost;
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.GONE)
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delePost(id);
  }
}
