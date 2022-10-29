import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingress',
})
export class IngressPipe implements PipeTransform {
  transform(value: string): any {
    let wordsLeft = 200;
    let result = '';

    let valueArray = value.split(/<p+>/g);
    valueArray.forEach(element => {
      if (element.length > 8 && wordsLeft > 50) {
        if (element.includes('<img')) {
          result = result + '<p>' + element;
        } else {
          wordsLeft = wordsLeft - element.length;
          result = result + '<p>' + element;
        }
      }
    });
    return result;
  }
}
