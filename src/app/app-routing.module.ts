import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPageComponent } from './news-page/news-page.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { GiftPageComponent } from './gift-page/gift-page.component';
import { RefillPageComponent } from './refill-page/refill-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PostPageComponent } from './news-page/post-page/post-page.component';

export const routes: Routes = [
  {
    path: 'news',
    children: [
      {
        path: '',
        component: NewsPageComponent,
      },
      {
        path: 'post/:id',
        component: PostPageComponent,
      },
    ],
  },
  { path: 'calendar-page', component: CalendarPageComponent },
  { path: 'gift-page', component: GiftPageComponent },
  { path: 'refill-page', component: RefillPageComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: '', redirectTo: 'news', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
