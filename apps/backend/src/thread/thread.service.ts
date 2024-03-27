import { INestApplication, Inject, Injectable } from '@nestjs/common'
import { workerData } from 'node:worker_threads'
import { META_STORAGE_TOKEN } from './thread.constant'
import { ThreadMetaStorage, ThreadPayload } from './thread.type'

@Injectable()
export class ThreadService {
  constructor(
    @Inject(META_STORAGE_TOKEN) private readonly metaStorage: ThreadMetaStorage
  ) {}

  async runInThread(app: INestApplication) {
    const { argsJson, className, methodName } = workerData as ThreadPayload
    const cls = this.metaStorage.find((i) => i.name === className)

    await app.get(cls)[methodName](...JSON.parse(argsJson))
    process.exit(0)
  }
}
