import {
  BadRequestException,
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
    @Query('offset') offset: string = '0',
    @Query('limit') limit: string = '10',
  ) {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Query parameter "q" is required');
    }

    const offsetNum = isNaN(parseInt(offset, 10)) ? 0 : parseInt(offset, 10);
    const limitNum = isNaN(parseInt(limit, 10)) ? 10 : parseInt(limit, 10);

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
