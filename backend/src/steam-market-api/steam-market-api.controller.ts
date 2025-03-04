import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SteamMarketApiService } from './steam-market-api.service';

@ApiTags('Steam Market API')
@Controller('steam-market-api')
export class SteamMarketApiController {
  constructor(private readonly steamMarketApiService: SteamMarketApiService) {}

  @Get()
  getCases() {
    return this.steamMarketApiService.handleCron();
  }
}
