import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios, { AxiosInstance } from 'axios';
import { differenceInCalendarDays, subDays } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICaseFromSteamApi } from 'types';

@Injectable()
export class SteamMarketApiService implements OnModuleInit {
  private axiosInstance: AxiosInstance | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.axiosInstance = axios.create({
      baseURL: 'https://steamwebapi.com',
      params: {
        key: this.configService.getOrThrow<string>('STEAM_API_KEY'),
      },
    });
  }

  @Cron('0 0 * * 1,4,7')
  async handleCron() {
    console.log(
      'Fetching cases from Steam API... Monday, Thursday, Sunday at 00:00',
    );
    try {
      const cases = await this.fetchCasesFromSteamApi();
      const processedCases = await this.processCases(cases);
      console.log('Cases updated successfully');
      return processedCases;
    } catch (error) {
      console.error('Failed to update case data:', error);
    }
  }

  private async fetchCasesFromSteamApi(): Promise<ICaseFromSteamApi[]> {
    const { data } = await this.axiosInstance?.get<ICaseFromSteamApi[]>(
      '/steam/api/items',
      {
        params: {
          item_type: 'case',
        },
      },
    );
    return data;
  }

  private async processCases(cases: ICaseFromSteamApi[]) {
    const results = [];
    for (const caseItem of cases) {
      try {
        console.log(`Processing case: ${caseItem.marketname}`);
        const priceHistory = await this.fetchPriceHistory(
          caseItem.markethashname,
        );
        const roiMetrics = this.calculateRoiMetrics(
          priceHistory,
          caseItem.pricelatest,
        );

        const updatedCase = await this.updateCaseInDatabase(
          caseItem,
          roiMetrics,
        );
        results.push(updatedCase);

        await this.delay(7000);
      } catch (error) {
        console.error(
          `Failed to process case ${caseItem.markethashname}:`,
          error,
        );
        continue;
      }
    }
    return results;
  }

  private async fetchPriceHistory(marketHashName: string) {
    try {
      const response = await this.axiosInstance?.get('/steam/api/history', {
        params: {
          market_hash_name: marketHashName,
          interval: 1,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private calculateRoiMetrics(
    priceHistory: {
      id: number;
      createdat: string;
      price: number;
      sold: null;
    }[],
    currentPrice: number,
  ) {
    // Helper function to find the closest price to a specific date
    const findClosestPrice = (targetDate: Date) => {
      return priceHistory.reduce(
        (closest, item) => {
          const itemDate = new Date(item.createdat);
          const currentDiff = Math.abs(
            differenceInCalendarDays(targetDate, itemDate),
          );
          const closestDiff = closest
            ? Math.abs(
                differenceInCalendarDays(
                  targetDate,
                  new Date(closest.createdat),
                ),
              )
            : Infinity;
          return currentDiff < closestDiff ? item : closest;
        },
        null as { createdat: string; price: number } | null,
      );
    };

    const now = new Date();
    const oneWeekAgo = subDays(now, 7);
    const oneMonthAgo = subDays(now, 30);
    const sixMonthsAgo = subDays(now, 180);
    const oneYearAgo = subDays(now, 365);

    const oneWeekAgoPrice = findClosestPrice(oneWeekAgo)?.price || currentPrice;
    const oneMonthAgoPrice =
      findClosestPrice(oneMonthAgo)?.price || currentPrice;
    const sixMonthsAgoPrice =
      findClosestPrice(sixMonthsAgo)?.price || currentPrice;
    const oneYearAgoPrice = findClosestPrice(oneYearAgo)?.price || currentPrice;

    const calculateRoi = (oldPrice: number) => {
      if (oldPrice <= 0 || oldPrice === currentPrice) return 0;
      return ((currentPrice - oldPrice) / oldPrice) * 100;
    };

    return {
      investingRoiWeek: calculateRoi(oneWeekAgoPrice),
      investingRoi1M: calculateRoi(oneMonthAgoPrice),
      investingRoi6M: calculateRoi(sixMonthsAgoPrice),
      investingRoiYear: calculateRoi(oneYearAgoPrice),
    };
  }

  private async updateCaseInDatabase(
    caseItem: ICaseFromSteamApi,
    roiMetrics: any,
  ) {
    return this.prisma.case.upsert({
      where: {
        market_hash_name: caseItem.markethashname,
      },
      update: {
        price: caseItem.pricelatest,
        name: caseItem.marketname,
        listings: caseItem.offervolume,
        imageUrl: caseItem.itemimage,
        ...roiMetrics,
      },
      create: {
        market_hash_name: caseItem.markethashname,
        price: caseItem.pricelatest,
        name: caseItem.marketname,
        listings: caseItem.offervolume,
        imageUrl: caseItem.itemimage,
        ...roiMetrics,
      },
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
