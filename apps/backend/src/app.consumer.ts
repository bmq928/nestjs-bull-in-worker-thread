import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import * as timers from 'node:timers/promises'
import { RunInThread } from './thread/thread.decorator'

@Processor('blocking-job')
export class AppConsumer {
  private readonly logger = new Logger(AppConsumer.name)

  @Process('while-true')
  @RunInThread()
  async whileTrue(job: Job<{ max: number }>) {
    const { max } = job.data
    this.logger.verbose({ max })

    let progress = 0
    while (progress < max) ++progress
    // this.logger.verbose(`job running with progress ${progress++}`)
    return job
  }

  @Process('sleep')
  async sleep(job: Job<{ max: number }>) {
    const { max } = job.data
    await timers.setTimeout(max * 1000)
    this.logger.verbose('done')
  }
}
