import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeSafeHtml',
})
export class SanitizeSafeHtmlPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(htmlString: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(htmlString);
  }
}
