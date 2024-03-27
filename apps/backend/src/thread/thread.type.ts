import { Type } from '@nestjs/common'

export type ThreadPayload = {
  className: string
  methodName: string
  argsJson: string
}

export type ThreadMetaStorage = Type<unknown>[]
