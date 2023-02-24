import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPageComponent } from './news-page/news-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { GiftPageComponent } from './gift-page/gift-page.component';
import { RefillPageComponent } from './refill-page/refill-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  { path: 'news-page', component: NewsPageComponent },
  { path: 'calendar-page', component: CalendarPageComponent },
  { path: 'gift-page', component: GiftPageComponent },
  { path: 'refill-page', component: RefillPageComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: '', redirectTo: 'news-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
