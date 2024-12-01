import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { SearchQueryDto } from 'src/dtos/search.dto';
import { SearchService } from 'src/services/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /**
   * GET /search
   * Performs a search using the DuckDuckGo API with a query parameter `q`.
   */
  @Get()
  async search(@Query('q') query: string) {
    return this.searchService.searchDuckDuckGo(query);
  }

  /**
   * POST /search
   * Performs a search using the DuckDuckGo API with a query in the request body.
   */
  @Post()
  async searchWithBody(@Body(new ValidationPipe()) body: SearchQueryDto) {
    return this.searchService.searchDuckDuckGo(body.query);
  }

  /**
   * GET /search/history
   * Retrieves the search history stored in the server.
   */
  @Get('history')
  getHistory() {
    return this.searchService.getHistory();
  }
}
