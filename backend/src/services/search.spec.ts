import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import { of } from 'rxjs';

jest.mock('fs'); // Mock of 'fs' module

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  describe('clearHistory', () => {
    it('should clear the history file', () => {
      // Simular estado inicial do arquivo
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fs, 'writeFileSync').mockImplementation();
      jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(['test']));

      service.clearHistory();

      // Check if file was overwritten with empty array
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify([], null, 2),
        'utf8',
      );
    });
  });
});
