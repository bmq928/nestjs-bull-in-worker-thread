import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'

export interface AddJobProps {
  max: number
  name: string
}

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('blocking-job') private readonly blockingJobQueue: Queue
  ) {}

  addJob({ max, name }: AddJobProps) {
    return this.blockingJobQueue.add(name, { max }, {})
  }
}
