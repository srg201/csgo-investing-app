import { PartialType } from '@nestjs/swagger';
import { CreateSteamMarketApiDto } from './create-steam-market-api.dto';

export class UpdateSteamMarketApiDto extends PartialType(CreateSteamMarketApiDto) {}
