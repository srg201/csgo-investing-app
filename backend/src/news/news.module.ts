import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { RssModule } from 'src/rss/rss.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [RssModule, AiModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
