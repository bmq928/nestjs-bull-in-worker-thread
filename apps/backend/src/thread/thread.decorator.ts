import { Logger } from '@nestjs/common'
import { Worker, isMainThread, parentPort } from 'node:worker_threads'
import { ThreadPayload } from './thread.type'

export const RunInThread =
  () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const origin = descriptor.value
    const className = target.constructor.name
    const methodName = propertyKey

    descriptor.value = new Proxy(origin, {
      apply(target, thisArg, argArray) {
        if (!isMainThread)
          return Promise.resolve(target.apply(thisArg, argArray)).then(
            responseToMainThread
          )

        const payload: ThreadPayload = {
          className,
          methodName,
          argsJson: JSON.stringify(argArray),
        }
        return spawnNewWorker(payload)
      },
    })
  }

function responseToMainThread(data: unknown) {
  parentPort.postMessage(data)
}

function spawnNewWorker(payload: ThreadPayload) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData: payload })
    worker.once('message', resolve)
    worker.once('error', reject)
    worker.once('exit', (code: number) => {
      if (code !== 0)
        Logger.error(
          `${payload.className}.${payload.methodName} worker exit with code ${code} `
        )
    })
  })
}
