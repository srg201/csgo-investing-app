import { Module } from '@nestjs/common';
import { SteamMarketApiService } from './steam-market-api.service';
import { SteamMarketApiController } from './steam-market-api.controller';

@Module({
  providers: [SteamMarketApiService],
  controllers: [SteamMarketApiController],
})
export class SteamMarketApiModule {}
