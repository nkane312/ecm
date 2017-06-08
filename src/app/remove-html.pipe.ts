import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtml'
})
export class RemoveHtmlPipe implements PipeTransform {

  transform(value: any, args?: any, args2?: any, args3?: any): any {
    if (args === 'space') {
      value = value.replace(/<([br /]{1,})>/g, ' ');
    }
    if (args2 === 'rsquo') {
      value = value.replace(/&rsquo;/g, '’')
    }
    if (args3 === 'lsquo') {
      value = value.replace(/&lsquo;/g, '‘')
    }
    if (value) {
      value = value.replace(/<([a-zA-Z\d\s\/\=\"\"\:\.]{1,})>/g, '');
    }
    return value;
  }
}
