import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from './calendar-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CalendarPageComponent],
  exports: [CalendarPageComponent],
  imports: [
    SharedModule,
    CommonModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
  ],
})
export class CalendarPageModule {}
