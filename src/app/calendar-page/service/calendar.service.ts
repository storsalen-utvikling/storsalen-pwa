import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { BehaviorSubject, filter } from 'rxjs';
import { CalendarCacheService } from "../repository/calendar-cache.service";
import { CalendarEvent, WP_REST_API_Events } from "../calendar.types";

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private static postsPerPage = '8';
  private static wpUrl = 'https://storsalen.no/wp-json/wp/v2/kalender';

  private _clearEventsOnNextLoad = false;

  private readonly _events$ = new BehaviorSubject<Map<number, CalendarEvent>>(new Map<number, CalendarEvent>());
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private calendarCache: CalendarCacheService) {
    this.populateFromCache().catch(console.error);
  }

  get events$() {
    return this._events$.pipe(
      map(event => Array.from(event.values())),
      map(event => event.sort((first, second) => this.compareDates(second.date, first.date)))
    );
  }

  getEvent(id: number) {
    return this._events$.pipe(
      map(events => events.get(id)),
      filter(event => !!event),
      map(event => event!)
    );
  }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  loadTailEvents() {
    this.loadEvents(this._events$.value.size);
  }

  loadHeadEvents() {
    this._clearEventsOnNextLoad = true;
    this.loadEvents(0);
  }

  private async populateFromCache() {
    const events = await this.calendarCache.getCachedCalendarEvents();
    events.forEach(post => this._events$.value.set(post.id, post));
    this._events$.next(this._events$.value);
  }

  private loadEvents(offset: number) {
    if (this._isLoading$.value) {
      return;
    }
    this._isLoading$.next(true);
    this.http
      .get<WP_REST_API_Events>(CalendarService.wpUrl, {
        params: {
          per_page: CalendarService.postsPerPage,
          offset: `${offset}`,
          'filter[orderby]': 'start_date',
          'filter[order]': 'asc',
          'filter[meta_key]': 'start_date',
          'filter[meta_compare]': '>',
          'filter[meta_value]': new Date().toISOString().slice(0, 10).replace(/-/g, ''),
        },
      })
      .pipe(
        map<WP_REST_API_Events, CalendarEvent[]>(posts =>
          posts.map(post => ({
            id: post.id,
            date: new Date(`${post.start_date.slice(0, 4)}-${post.start_date.slice(4, 6)}-${post.start_date.slice(6, 8)}`),
            title: post.title.rendered,
            link: post.acf.internal_link,
            author: post.acf.taler,
          }))
        ),
        tap(events => this.calendarCache.cacheCalendarEvents(events))
      )
      .subscribe(events => {
        if (this._clearEventsOnNextLoad) {
          this._events$.value.clear();
          this._clearEventsOnNextLoad = false;
        }

        events.forEach(event => this._events$.value.set(event.id, event));
        this._isLoading$.next(false);
        this._events$.next(this._events$.value);
      });
  }

  private compareDates = (a: Date, b: Date): number => {
    if (a > b) return -1;
    if (a < b) return +1;

    return 0;
  };
}
