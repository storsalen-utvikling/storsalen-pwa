import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { filter, Observable, pairwise, Subscription, tap, throttleTime } from "rxjs";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { CalendarEvent } from "./calendar.types";
import { CalendarService } from "./service/calendar.service";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements AfterViewInit, OnInit {
  private _loaderSubscription?: Subscription;

  @ViewChild(CdkVirtualScrollViewport)
  scroller!: CdkVirtualScrollViewport;
  events$: Observable<CalendarEvent[]> = this.calendarService.events$.pipe(tap(() => this.scroller?.checkViewportSize()));
  isLoading$: Observable<boolean> = this.calendarService.isLoading$;

  constructor(private calendarService: CalendarService) {}

  loadHeadEvents() {
    this.calendarService.loadHeadEvents()
  }

  ngOnInit() {
    this.loadHeadEvents();
  }

  ngAfterViewInit() {
    this._loaderSubscription = this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([prevOffset, nextOffset]) => nextOffset < prevOffset && nextOffset < 140),
        throttleTime(1000)
      )
      .subscribe(() => {
        this.calendarService.loadTailEvents();
      });
  }
}
