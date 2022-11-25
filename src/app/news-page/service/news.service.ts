import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import type { WP_REST_API_Posts } from 'wp-types';
import { Observable } from 'rxjs';
import { NewsPost } from '../news.types';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private static appCategory = '35';
  private static postsPerPage = '5';
  private static wpUrl = 'https://storsalen.no/wp-json/wp/v2/posts';

  constructor(private http: HttpClient) {}

  getPosts(page: number): Observable<NewsPost[]> {
    return this.http
      .get<WP_REST_API_Posts>(NewsService.wpUrl, {
        params: {
          categories: NewsService.appCategory,
          per_page: NewsService.postsPerPage,
          page: `${page}`,
          _embed: '',
        },
      })
      .pipe(
        map<WP_REST_API_Posts, NewsPost[]>(posts =>
          posts.map(post => ({
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
            dateGmt: post.date_gmt,
            excerpt: post.excerpt.rendered !== 'excerpt' ? post.excerpt.rendered : undefined,
            // @ts-ignore
            mediaUrl: post._embedded?.['wp:featuredmedia']?.at(0)?.media_details?.sizes?.medium?.source_url,
          }))
        )
      );
  }
}
