import { IsNumber, IsOptional } from 'class-validator';

export class FiltersDto {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;

  @IsOptional()
  exclude?: string;
}
