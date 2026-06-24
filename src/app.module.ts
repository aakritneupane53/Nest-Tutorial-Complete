import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [HelloModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
