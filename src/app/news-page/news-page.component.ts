import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from './service/news.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, Observable, pairwise, Subscription, tap, throttleTime } from 'rxjs';
import { NewsPost } from './news.types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements AfterViewInit, OnInit {
  private _loaderSubscription?: Subscription;

  @ViewChild(CdkVirtualScrollViewport)
  scroller!: CdkVirtualScrollViewport;
  posts$: Observable<NewsPost[]> = this.newsService.posts$.pipe(tap(() => this.scroller?.checkViewportSize()));
  isLoading$: Observable<boolean> = this.newsService.isLoading$;

  constructor(private newsService: NewsService) {}

  loadHeadPosts() {
    this.newsService.loadHeadPosts();
  }

  ngOnInit() {
    this.loadHeadPosts();
  }

  ngAfterViewInit(): void {
    this._loaderSubscription = this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([prevOffset, nextOffset]) => nextOffset < prevOffset && nextOffset < 140),
        throttleTime(1000)
      )
      .subscribe(() => {
        this.newsService.loadTailPosts();
      });
  }
}
