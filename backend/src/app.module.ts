import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SteamMarketApiModule } from './steam-market-api/steam-market-api.module';
import { CasesModule } from './cases/cases.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from './news/news.module';
import { AiModule } from './ai/ai.module';
import { RssModule } from './rss/rss.module';
@Module({
  imports: [
    SteamMarketApiModule,
    CasesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    ScheduleModule.forRoot(),
    NewsModule,
    AiModule,
    RssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
