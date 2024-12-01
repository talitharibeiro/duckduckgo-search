import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from 'src/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // Route to search on DuckDuckGo
  @Get()
  async search(@Query('q') query: string) {
    return this.searchService.searchDuckDuckGo(query);
  }

  // Route to get search history
  @Get('history')
  getHistory() {
    return this.searchService.getHistory();
  }
}
