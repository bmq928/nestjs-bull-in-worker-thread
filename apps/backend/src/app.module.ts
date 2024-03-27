import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { AppConsumer } from './app.consumer'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ThreadModule } from './thread/thread.module'

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: 'blocking-job' }),
    ThreadModule.forRoot(),
    ThreadModule.forFeature({ providers: [AppConsumer] }),
  ],
  controllers: [AppController],
  providers: [AppService, AppConsumer],
})
export class AppModule {}
