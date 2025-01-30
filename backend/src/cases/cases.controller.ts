import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { FiltersDto } from './dto/filters.dto';

@ApiTags('cases')
@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @ApiOperation({ summary: 'Get all cases with filters' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['investingRoi', 'price', 'listings'],
  })
  @ApiQuery({ name: 'sortType', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({
    name: 'investType',
    required: false,
    enum: ['1week', '1month', '6month', '1year'],
  })
  @ApiResponse({ status: 200, description: 'Returns filtered list of cases' })
  @Get()
  getCases(@Query() query: FiltersDto) {
    return this.casesService.getCases(query);
  }

  @Get('updated-time')
  getUpdatedTime() {
    return this.casesService.getUpdatedTime();
  }

  @Get(':id')
  getCaseById(@Param('id') id: string) {
    return this.casesService.getCaseById(id);
  }
}
