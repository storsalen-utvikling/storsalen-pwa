import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NewsService } from './service/news.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, pairwise, startWith, switchMap, throttleTime } from 'rxjs';
import { NewsPost } from './news.types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport)
  scroller!: CdkVirtualScrollViewport;

  currentPage = 1;
  posts: NewsPost[] = [];

  constructor(private newsService: NewsService) {}

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([prevOffset, nextOffset]) => nextOffset < prevOffset && nextOffset < 140),
        throttleTime(1000),
        map(_ => this.newsService.getPosts(this.currentPage++)),
        startWith(this.newsService.getPosts(this.currentPage++)),
        switchMap(posts => posts)
      )
      .subscribe(value => {
        this.posts = [...this.posts, ...value];
        this.scroller.checkViewportSize();
      });
  }
}
