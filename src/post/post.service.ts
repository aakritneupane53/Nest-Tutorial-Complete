import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interface/post.interface';

@Injectable()
export class PostService {
  posts: Post[];
  constructor() {
    this.posts = [
      {
        id: 1,
        title: 'First Post',
        content: 'This is the first post',
        authorName: 'Failure-101',
        createdAt: new Date(),
      },
    ];
  }

  private getNextPostId(): number {
    return this.posts.length + 1;
  }

  fetchPosts(search?: string): Post[] | Post {
    if (!search) return this.posts;

    const matchingPost = this.posts.find((post) => post.title === search);
    if (!matchingPost)
      throw new NotFoundException('Post with the title not found');

    return matchingPost;
  }

  fetchPost(id: number): Post | null {
    const matchingPost = this.posts.find((post) => post.id === id);
    if (!matchingPost)
      throw new NotFoundException('Post with the provided id not found');

    return matchingPost;
  }

  createNewPost(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newId = this.getNextPostId();
    const newPost = {
      ...createPostData,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.posts.push(newPost);

    return newPost;
  }

  delePost(id: number) {
    const matchingPostIndex = this.posts.findIndex((post) => post.id === id);
    if (matchingPostIndex === -1)
      throw new NotFoundException('Post with the provided id not found');

    const matchPost = this.posts[matchingPostIndex];

    this.posts.splice(matchingPostIndex);
    return matchPost;
  }
}
