import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags } from '@nestjs/swagger';
import { FiltersDto } from './dto/filters.dto';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async generateNews() {
    return this.newsService.generateNews();
  }

  @Get()
  async getNews(@Query() filters: FiltersDto) {
    return this.newsService.getNews(filters);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.newsService.getOne(id);
  }
}
