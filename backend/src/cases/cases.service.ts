import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FiltersDto } from './dto/filters.dto';

@Injectable()
export class CasesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCases(filters: FiltersDto) {
    const { search, sortBy, sortType, investType } = filters;
    const orderBy: any = {};

    if (sortBy === 'investingRoi') {
      switch (investType) {
        case '1week':
          orderBy.investingRoiWeek = sortType;
          break;
        case '1month':
          orderBy.investingRoi1M = sortType;
          break;
        case '6month':
          orderBy.investingRoi6M = sortType;
          break;
        case '1year':
          orderBy.investingRoiYear = sortType;
          break;
      }
    } else if (sortBy === 'price') {
      orderBy.price = sortType;
    } else if (sortBy === 'listings') {
      orderBy.listings = sortType;
    }

    return this.prisma.case.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      orderBy,
    });
  }

  async getUpdatedTime() {
    return this.prisma.case.findFirst({
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async getCaseById(id: string) {
    return this.prisma.case.findUnique({
      where: { id },
    });
  }
}
