import { DynamicModule, Module, Type } from '@nestjs/common'
import { META_STORAGE_TOKEN, metaStorage } from './thread.constant'
import { ThreadService } from './thread.service'

@Module({})
export class ThreadModule {
  static forRoot(): DynamicModule {
    return {
      module: ThreadModule,
      providers: [
        ThreadService,
        { provide: META_STORAGE_TOKEN, useValue: metaStorage },
      ],
    }
  }

  static forFeature({
    providers,
  }: {
    providers: Type<unknown>[]
  }): DynamicModule {
    metaStorage.push(...providers)
    return {
      module: ThreadModule,
    }
  }
}
