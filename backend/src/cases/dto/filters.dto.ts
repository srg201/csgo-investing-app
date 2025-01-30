import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['investingRoi', 'price', 'listings'])
  sortBy?: 'investingRoi' | 'price' | 'listings';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortType?: 'asc' | 'desc';

  @IsOptional()
  @IsEnum(['1week', '1month', '6month', '1year'])
  investType?: '1week' | '1month' | '6month' | '1year';
}
