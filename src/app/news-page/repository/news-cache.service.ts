import { Injectable } from '@angular/core';
import { NewsPost } from '../news.types';
import { newsDb, NewsPostRow } from './news.db';

@Injectable({
  providedIn: 'root',
})
export class NewsCacheService {
  constructor() {}

  async getCachedNewsPosts(): Promise<NewsPost[]> {
    const news = await newsDb.newsPosts.toArray();
    return news.map(this.mapToModel);
  }

  async cacheNewsPosts(postsToCache: NewsPost[]) {
    await newsDb.newsPosts.bulkAdd(postsToCache.map(this.mapToRow));
  }

  async isCached(id: number): Promise<boolean> {
    const cachedPost = await newsDb.newsPosts.get(id);
    return cachedPost !== undefined;
  }

  // scaffolding for future mapping
  private mapToModel(row: NewsPostRow): NewsPost {
    return { ...row };
  }

  // scaffolding for future mapping
  private mapToRow(model: NewsPost): NewsPostRow {
    return { ...model };
  }
}
