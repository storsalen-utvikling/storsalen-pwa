import { Component } from '@angular/core';
import { NewsService } from '../service/news.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, mergeMap, Observable } from 'rxjs';
import { NewsPost } from '../news.types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
})
export class PostPageComponent {
  post$: Observable<NewsPost> = this.route.paramMap.pipe(
    map(params => parseInt(params.get('id')!)),
    mergeMap(id => this.newsService.getPost(id)),
  );

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}
}
