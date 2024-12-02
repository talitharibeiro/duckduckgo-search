import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from '../services/search.service';

describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: {
            searchDuckDuckGo: jest.fn(),
            getHistory: jest.fn(),
            clearHistory: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should call searchDuckDuckGo with correct parameters', async () => {
      const query = 'test';
      const offset = '0';
      const limit = '10';
      jest.spyOn(service, 'searchDuckDuckGo').mockResolvedValue({
        results: [],
        totalResults: 0,
      });

      await controller.search(query, offset, limit);

      expect(service.searchDuckDuckGo).toHaveBeenCalledWith(query, 0, 10);
    });

    it('should throw an error if query is missing', async () => {
      await expect(controller.search('', '0', '10')).rejects.toThrow();
    });
  });

  describe('searchWithBody', () => {
    it('should call searchDuckDuckGo with correct parameters from body', async () => {
      const body = { query: 'test', offset: 0, limit: 10 };
      jest.spyOn(service, 'searchDuckDuckGo').mockResolvedValue({
        results: [],
        totalResults: 0,
      });

      await controller.searchWithBody(body);

      expect(service.searchDuckDuckGo).toHaveBeenCalledWith(
        body.query,
        body.offset,
        body.limit,
      );
    });
  });

  describe('getHistory', () => {
    it('should return search history from service', () => {
      const history = ['query1', 'query2'];
      jest.spyOn(service, 'getHistory').mockReturnValue(history);

      const result = controller.getHistory();

      expect(result).toEqual(history);
    });
  });

  describe('clearHistory', () => {
    it('should call clearHistory on the service', () => {
      const spy = jest.spyOn(service, 'clearHistory');

      const result = controller.clearHistory();

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Search history cleared successfully',
      });
    });
  });
});
