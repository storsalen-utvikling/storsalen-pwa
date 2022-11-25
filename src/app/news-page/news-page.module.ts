import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NewsPageComponent } from './news-page.component';
import { IngressPipe } from './pipes/ingress.pipe';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NewsPageComponent, IngressPipe],
  exports: [NewsPageComponent],
  imports: [SharedModule, AppRoutingModule, MatCardModule, RouterLink, CommonModule],
})
export class NewsPageModule {}
