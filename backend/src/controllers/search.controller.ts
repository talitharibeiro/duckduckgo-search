import {
  Body,
  Controller,
  Delete,
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
  async search(
    @Query('q') query: string,
    @Query('offset') offset: string = '',
    @Query('limit') limit: string = '',
  ) {
    const offsetNum = parseInt(offset, 10);
    const limitNum = parseInt(limit, 10);
    return this.searchService.searchDuckDuckGo(query, offsetNum, limitNum);
  }

  /**
   * POST /search
   * Performs a search using the DuckDuckGo API with a query in the request body.
   */
  @Post()
  async searchWithBody(@Body(new ValidationPipe()) body: SearchQueryDto) {
    const { query, offset = 0, limit = 10 } = body;
    return this.searchService.searchDuckDuckGo(query, offset, limit);
  }

  /**
   * GET /search/history
   * Retrieves the search history stored in the server.
   */
  @Get('history')
  getHistory() {
    return this.searchService.getHistory();
  }

  /**
   * DELETE /search/history
   * Delete the search history stored in the server.
   */
  @Delete('history')
  clearHistory() {
    this.searchService.clearHistory();
    return { message: 'Search history cleared successfully' };
  }
}
