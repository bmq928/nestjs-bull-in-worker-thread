import { Controller, Get, Query } from '@nestjs/common'
import { AddJobProps, AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health() {
    return 'kame'
  }

  @Get('/do')
  createJob(@Query() q: AddJobProps) {
    return this.appService.addJob(q)
  }
}
