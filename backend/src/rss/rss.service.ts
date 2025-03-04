import { Injectable } from '@nestjs/common';
import { RSS_FEED_URIS } from '../../constants';
import * as Parser from 'rss-parser';
import { getNewsLink } from 'utils/get-rss-domain';

@Injectable()
export class RssService {
  private readonly parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  async fetchRssFeed() {
    const feedsData = [];
    for (const feedUrl of RSS_FEED_URIS) {
      console.log('PROCESSING FEED 👀', feedUrl);
      try {
        const feed = await this.parser.parseURL(feedUrl);

        feed.items.forEach((item) => {
          feedsData.push({
            title: item.title,
            link: getNewsLink(feedUrl, item.link),
            source: item.creator,
            description: item.content,
            summary: item.summary,
            categories: item.categories,
            publishedDate: item.pubDate,
            snippet: item.contentSnippet,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }

    return feedsData;
  }
}
