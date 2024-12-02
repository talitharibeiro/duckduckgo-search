import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SearchService {
  private readonly apiUrl = 'http://api.duckduckgo.com/';
  private readonly historyFilePath = path.resolve(
    process.cwd(),
    'src',
    'history',
    'query-history.json',
  );

  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * Method to perform a search on DuckDuckGo
   */
  async searchDuckDuckGo(query: string, offset: number, limit: number) {
    if (!query.trim()) {
      throw new BadRequestException('Query cannot be empty');
    }

    const url = `${this.apiUrl}?q=${query}&format=json`;

    try {
      const response = await lastValueFrom(this.httpService.get(url));

      const allResults = response.data.RelatedTopics.map((item) => {
        if (item.Text && item.FirstURL) {
          return {
            title: item.Text,
            url: item.FirstURL,
          };
        }
        return null;
      }).filter((item) => item !== null);

      // Ensure offset and limit are within bounds
      const paginatedResults = allResults.slice(offset, offset + limit);

      this.saveQueryToHistory(query);

      return {
        results: paginatedResults,
        totalResults: allResults.length,
      };
    } catch (error) {
      this.logger.error('Error fetching data from DuckDuckGo API', error.stack);
      throw new BadRequestException('Failed to fetch data from DuckDuckGo API');
    }
  }

  /**
   * Save a query to the history file
   */
  private saveQueryToHistory(query: string): void {
    try {
      const history = this.getHistory();

      if (!history.includes(query)) {
        history.push(query);
      }

      // Ensure the directory exists before saving
      const dirPath = path.dirname(this.historyFilePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Write the updated history to the JSON file
      fs.writeFileSync(
        this.historyFilePath,
        JSON.stringify(history, null, 2),
        'utf8',
      );
    } catch (error) {
      this.logger.error('Error saving query to history', error.stack);
    }
  }

  /**
   * Retrieve the search history from the file
   */
  getHistory(): string[] {
    try {
      if (fs.existsSync(this.historyFilePath)) {
        const data = fs.readFileSync(this.historyFilePath, 'utf8');
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      this.logger.error('Error reading history file', error.stack);
      return [];
    }
  }

  /**
   * Clear the search history
   */
  clearHistory(): void {
    try {
      if (fs.existsSync(this.historyFilePath)) {
        fs.writeFileSync(
          this.historyFilePath,
          JSON.stringify([], null, 2),
          'utf8',
        );
      }
    } catch (error) {
      this.logger.error('Error clearing history file', error.stack);
    }
  }
}
