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
import { CreatePostDto } from './dto/createPost.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('all')
  fetchPosts(@Query('search') search: string) {
    return this.postService.fetchPosts(search);
  }
  @Get(':id')
  fetchPost(@Param('id', ParseIntPipe, PostExistsPipe) id: number) {
    return this.postService.fetchPost(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() createPostData: CreatePostDto) {
    const newPost = this.postService.createNewPost(createPostData);
    return newPost;
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.GONE)
  deletePost(@Param('id', ParseIntPipe, PostExistsPipe) id: number) {
    return this.postService.delePost(id);
  }
}
