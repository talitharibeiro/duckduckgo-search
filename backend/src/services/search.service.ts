import { Injectable } from '@nestjs/common';
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

  constructor(private readonly httpService: HttpService) {}

  // Method to do a search on DuckDuckGo
  async searchDuckDuckGo(query: string, offset: number, limit: number) {
    const url = `${this.apiUrl}?q=${query}&format=json`;
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
  }

  // Method to save a query to the history
  private saveQueryToHistory(query: string): void {
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
  }

  // Method to get the search history
  getHistory(): string[] {
    try {
      if (fs.existsSync(this.historyFilePath)) {
        const data = fs.readFileSync(this.historyFilePath, 'utf8');
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.error('Error reading history file:', error);
      return [];
    }
  }
}
