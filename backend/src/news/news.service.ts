import { BadRequestException, Injectable } from '@nestjs/common';
import { RssService } from 'src/rss/rss.service';
import { AiService } from 'src/ai/ai.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FiltersDto } from './dto/filters.dto';
import { utapi } from 'lib/uploadthing';
import { subDays } from 'date-fns';

@Injectable()
export class NewsService {
  constructor(
    private readonly rssService: RssService,
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateNews() {
    try {
      console.log('Generating news...');

      const newsArray = await this.rssService.fetchRssFeed();
      const generatedNews = await this.aiService.generateNews(newsArray);
      const thumbnail = await this.aiService.generateThumbnail(
        generatedNews.content,
      );

      return await this.create({
        ...generatedNews,
        imageUrl: thumbnail.url,
        imageUploadthingKey: thumbnail.key,
      });
    } catch (error) {
      console.error('Error generating news: Retrying...', error);
      await this.generateNews();
    }
  }

  async create(createNewsDto: CreateNewsDto) {
    try {
      const createdNews = await this.prisma.news.create({
        data: {
          title: createNewsDto.title,
          content: createNewsDto.content,
          source: createNewsDto.source,
          timeToRead: +createNewsDto.timeToRead,
          imageUrl: createNewsDto?.imageUrl ?? null,
          imageUploadthingKey: createNewsDto?.imageUploadthingKey ?? null,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });

      return createdNews;
    } catch (error) {
      console.error('Error creating news: 🔴 ', error);
      throw new BadRequestException('Cannot create news');
    }
  }

  async getNews(filters: FiltersDto) {
    const { limit = 4, offset = 0, exclude } = filters;

    try {
      return await this.prisma.news.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        skip: +offset,
        take: +limit,
        select: {
          id: true,
          title: true,
          content: true,
          imageUrl: true,
          imageUploadthingKey: false,
          createdAt: true,
          updatedAt: true,
          timeToRead: true,
        },
        where: {
          id: {
            notIn: JSON.parse(exclude ?? '[]'),
          },
        },
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new BadRequestException('Cannot fetch news');
    }
  }

  async getOne(id: string) {
    try {
      return await this.prisma.news.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Cannot get news with id: ' + id);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async deleteOldNews() {
    try {
      console.log('Deleting old news...');
      const thirtyDaysAgo = subDays(new Date(), 30);

      const oldNews = await this.prisma.news.findMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo,
          },
        },
        select: {
          id: true,
          imageUploadthingKey: true,
        },
      });

      for (const news of oldNews) {
        if (news.imageUploadthingKey) {
          try {
            await utapi.deleteFiles(news.imageUploadthingKey);
          } catch (error) {
            console.error(`Failed to delete image for news ${news.id}:`, error);
          }
        }

        await this.prisma.news.delete({
          where: {
            id: news.id,
          },
        });
      }

      console.log('Old news deleted. 🗑️');
    } catch (error) {
      console.error('Error deleting old news 🔴 ', error);
    }
  }
}
