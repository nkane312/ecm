import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plainText'
})
export class PlainTextPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      let pArr = value.split(/<\/p>/g);
      pArr = pArr.map((p) => {
        let urls = p.match(/(?:href=")+([^\'\"]+)/g);
        if (urls) {
          p = p.concat('<br>');
          for (let i = 0; i < urls.length; i++) {
            if (i === urls.length - 1) {
              urls[i] = urls[i].replace('href="', '');
              p = p.concat(urls[i]);
            } else {
              urls[i] = urls[i].replace('href="', '');
              p = p.concat(urls[i] + '<br>');
            }
          }
          return p;
        } else {
          return p;
        }
      });
      return pArr.join('');
      // return value.replace(/(<[brBR\s\/]{1,}>)/g, '<br>');
    } else {
      return value;
    }
    // var urls = value.match(/href="([^\'\"]+)/g);
  }
}
