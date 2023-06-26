import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import type { WP_REST_API_Posts } from 'wp-types';
import { BehaviorSubject } from 'rxjs';
import { NewsPost } from '../news.types';
import { NewsCacheService } from '../repository/news-cache.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private static appCategory = '35';
  private static postsPerPage = '5';
  private static wpUrl = 'https://storsalen.no/wp-json/wp/v2/posts';

  private _clearPostsOnNextLoad = false;

  private readonly _posts$ = new BehaviorSubject<Map<number, NewsPost>>(new Map<number, NewsPost>());
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private newsCache: NewsCacheService) {
    this.populateFromCache().catch(console.error);
  }

  get posts$() {
    return this._posts$.pipe(
      map(posts => Array.from(posts.values())),
      map(posts => posts.sort((first, second) => this.compareDates(second.dateGmt, first.dateGmt)))
    );
  }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }

  loadTailPosts() {
    this.loadPosts(this._posts$.value.size);
  }

  loadHeadPosts() {
    this._clearPostsOnNextLoad = true;
    this.loadPosts(0);
  }

  private async populateFromCache() {
    const posts = await this.newsCache.getCachedNewsPosts();
    posts.forEach(post => this._posts$.value.set(post.id, post));
    this._posts$.next(this._posts$.value);
  }

  private loadPosts(offset: number) {
    if (this._isLoading$.value) {
      return;
    }
    this._isLoading$.next(true);
    this.http
      .get<WP_REST_API_Posts>(NewsService.wpUrl, {
        params: {
          categories: NewsService.appCategory,
          per_page: NewsService.postsPerPage,
          offset: `${offset}`,
          _embed: '',
        },
      })
      .pipe(
        map<WP_REST_API_Posts, NewsPost[]>(posts =>
          posts.map(post => ({
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
            dateGmt: new Date(post.date_gmt),
            excerpt: post.excerpt.rendered !== 'excerpt' ? post.excerpt.rendered : undefined,
            // @ts-ignore
            mediaUrl: post._embedded?.['wp:featuredmedia']?.at(0)?.media_details?.sizes?.medium?.source_url,
          }))
        ),
        tap(posts => this.newsCache.cacheNewsPosts(posts))
      )
      .subscribe(posts => {
        if (this._clearPostsOnNextLoad) {
          this._posts$.value.clear();
          this._clearPostsOnNextLoad = false;
        }

        posts.forEach(post => this._posts$.value.set(post.id, post));
        this._isLoading$.next(false);
        this._posts$.next(this._posts$.value);
      });
  }

  private compareDates = (a: Date, b: Date): number => {
    if (a < b) return -1;
    if (a > b) return +1;

    return 0;
  };
}
