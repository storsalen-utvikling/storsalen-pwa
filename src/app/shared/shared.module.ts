import { NgModule } from '@angular/core';
import { SanitizeSafeHtmlPipe } from './pipes/sanitize-safe-html.pipe';

@NgModule({
  declarations: [SanitizeSafeHtmlPipe],
  imports: [],
  exports: [SanitizeSafeHtmlPipe],
})
export class SharedModule {}
