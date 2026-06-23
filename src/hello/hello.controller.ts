import { Controller, Param, Get, Query } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  // handling the ddynamic route parameter
  @Get(':name')
  getHello(@Param('name') name: string) {
    return { message: this.helloService.sayHello(name) };
  }

  //handling the query parameter
  @Get()
  getHelloQ(@Query('q') q: string) {
    return { message: this.helloService.sayHello(q) };
  }
}
