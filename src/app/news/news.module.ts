import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

import { NewsComponent } from './news.component';
import { IngressPipe } from './pipes/ingress.pipe';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NewsComponent, IngressPipe],
  exports: [NewsComponent],
  imports: [SharedModule, AppRoutingModule, BrowserModule, MatCardModule, RouterLinkWithHref],
})
export class NewsModule {}
