import Dexie, { Table } from 'dexie';

export interface CalendarEventRow {
  id: number;
  date: Date;
  title: string;
  link: string;
  author: string;
}

export class CalendarDb extends Dexie {
  calendarEvents!: Table<CalendarEventRow, number>;

  constructor() {
    super('CalendarDatabase');
    this.version(1).stores({
      calendarEvents: 'id',
    });
  }
}

export const calendarDb = new CalendarDb();
