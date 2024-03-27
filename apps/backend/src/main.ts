/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core'

import { Logger } from '@nestjs/common'
import { isMainThread } from 'worker_threads'
import { AppModule } from './app.module'
import { ThreadService } from './thread/thread.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  if (!isMainThread) return app.get(ThreadService).runInThread(app)

  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(
    `🚀 Application pid ${process.pid} running on: http://localhost:${port}`
  )
}

bootstrap()
