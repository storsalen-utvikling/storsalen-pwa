import { Component } from '@angular/core';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent {
  posts$ = this.newsService.getPosts(1);

  constructor(private newsService: NewsService) {}
}
