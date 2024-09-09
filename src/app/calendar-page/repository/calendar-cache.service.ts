import { Injectable } from "@angular/core";
import { CalendarEvent } from "../calendar.types";
import { calendarDb, CalendarEventRow } from "./calendar.db";

@Injectable({
  providedIn: 'root',
})
export class CalendarCacheService {
  constructor() {}

  async getCachedCalendarEvents(): Promise<CalendarEvent[]> {
    const news = await calendarDb.calendarEvents.toArray();
    return news.map(this.mapToModel);
  }

  async cacheCalendarEvents(eventsToCache: CalendarEvent[]) {
    await calendarDb.calendarEvents.bulkPut(eventsToCache.map(this.mapToRow));
  }

  async isCached(id: number): Promise<boolean> {
    const cachedEvent = await calendarDb.calendarEvents.get(id);
    return cachedEvent !== undefined;
  }

  // scaffolding for future mapping
  private mapToModel(row: CalendarEventRow): CalendarEvent {
    return { ...row };
  }

  // scaffolding for future mapping
  private mapToRow(model: CalendarEvent): CalendarEvent {
    return { ...model };
  }
}
