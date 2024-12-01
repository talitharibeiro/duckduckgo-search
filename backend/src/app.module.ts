import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class AppModule {}
