import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NewsPageComponent } from './news-page.component';
import { IngressPipe } from './pipes/ingress.pipe';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [NewsPageComponent, IngressPipe],
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
  ],
})
export class NewsPageModule {}
