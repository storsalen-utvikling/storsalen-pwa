import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NewsPageComponent } from './news-page.component';
import { IngressPipe } from './pipes/ingress.pipe';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PostPageComponent } from './post-page/post-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [NewsPageComponent, IngressPipe, PostPageComponent],
  exports: [NewsPageComponent],
  imports: [
    SharedModule,
    AppRoutingModule,
    MatCardModule,
    RouterLink,
    CommonModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    NgOptimizedImage,
  ],
})
export class NewsPageModule {}
