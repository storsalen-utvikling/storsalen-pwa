import Dexie, { Table } from 'dexie';

export interface NewsPostRow {
  id: number;
  title: string;
  content: string;
  dateGmt: Date;
  mediaUrl?: string;
  excerpt?: string;
}

export class NewsDb extends Dexie {
  newsPosts!: Table<NewsPostRow, number>;

  constructor() {
    super('NewsDatabase');
    this.version(1).stores({
      newsPosts: 'id',
    });
  }
}

export const newsDb = new NewsDb();
