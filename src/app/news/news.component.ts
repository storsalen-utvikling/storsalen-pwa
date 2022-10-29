import { Component } from '@angular/core';
import { NewsService } from './service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  posts$ = this.newsService.getPosts(1);

  constructor(private newsService: NewsService) {}
}
