import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphaOrder'
})
export class AlphaOrderPipe implements PipeTransform {
    
  transform(array: Array<any>, args: any): Array<any> {
      array.sort((a: any, b: any) => {
        if ( a[args] < b[args] ){
          return -1;
        }else if( a[args] > b[args] ){
            return 1;
        }else{
          return 0;	
        }
      });
      return array;
    }

    /*transform(value: any, args?: any): any {
      if (args === 'abc') {
        value = value.sort();
        return value;
      }
    }*/
}