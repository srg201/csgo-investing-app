import { BadRequestException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { SYSTEM_PROMPT, THUMBNAIL_PROMPT } from '../../constants';
import { utapi } from 'lib/uploadthing';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.getOrThrow<string>('OPENAI_API_KEY'),
    });
  }

  async generateNews(news: any[]) {
    try {
      const result = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: JSON.stringify(news).slice(0, 4000) },
        ],
        response_format: { type: 'json_object' },
      });

      return JSON.parse(result.choices[0].message.content);
    } catch (error) {
      console.error('Error generating news: 🔴 ', error);
      throw new BadRequestException('Cannot generate news');
    }
  }

  async generateThumbnail(content: string) {
    try {
      const result = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: THUMBNAIL_PROMPT + content,
        style: 'natural',
        n: 1,
        size: '1792x1024',
      });

      const res = await utapi.uploadFilesFromUrl(result.data[0].url);
      return { url: res.data.ufsUrl, key: res.data.key };
    } catch (error) {
      console.error('Error generating thumbnail: 🔴 ', error);
      throw new BadRequestException('Cannot generate thumbnail');
    }
  }
}
