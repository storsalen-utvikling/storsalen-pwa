import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NewsPageComponent } from './news-page.component';
import { IngressPipe } from './pipes/ingress.pipe';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NewsPageComponent, IngressPipe],
  exports: [NewsPageComponent],
  imports: [SharedModule, AppRoutingModule, MatCardModule, RouterLinkWithHref, CommonModule],
})
export class NewsPageModule {}
